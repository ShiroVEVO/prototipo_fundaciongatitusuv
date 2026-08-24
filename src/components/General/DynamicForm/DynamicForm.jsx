import { useState } from "react";
import "./DynamicForm.css";

/**
 * DynamicForm — genera un formulario completo a partir de un JSON.
 *
 * Forma esperada de cada pregunta dentro de `questions`:
 * {
 *   id: string,                 // único, obligatorio
 *   type: "short_text" | "long_text" | "number" | "email" | "date"
 *       | "select" | "single_choice" | "multiple_choice",
 *   label: string,               // texto de la pregunta
 *   helpText?: string,           // aclaración opcional bajo la pregunta
 *   placeholder?: string,        // solo para inputs de texto
 *   required?: boolean,
 *   options?: [{ value: string, label: string }],
 *       // obligatorio para "select" | "single_choice" | "multiple_choice"
 *   dependsOn?: {
 *     questionId: string,        // id de la pregunta de la que depende
 *     value: string | string[],  // valor(es) que la habilitan
 *   } | Array<{ questionId: string, value: string | string[] }>,
 *     // también acepta un array de condiciones para depender de varias
 *     // preguntas a la vez (ver `dependsOnLogic`)
 *   dependsOnLogic?: "and" | "or", // "and" (default): deben cumplirse todas
 *     // las condiciones de `dependsOn`. "or": alcanza con que se cumpla una.
 * }
 *
 * Props:
 * - questions: array de preguntas (ver forma arriba)
 * - title / description: encabezado opcional del formulario
 * - onSubmit(answers): callback con las respuestas { [questionId]: valor }
 *   (solo incluye las preguntas que quedaron visibles al enviar)
 */

const TEXT_INPUT_TYPES = {
    short_text: "text",
    number: "number",
    email: "email",
    date: "date",
};

// evalúa si UNA condición { questionId, value } se cumple con las
// respuestas actuales
function isConditionMet(condition, answers) {
    const { questionId, value } = condition;
    const parentAnswer = answers[questionId];
    if (parentAnswer === undefined || parentAnswer === "") return false;

    const allowedValues = Array.isArray(value) ? value : [value];

    // si la pregunta padre es de opción múltiple, la respuesta es un array
    if (Array.isArray(parentAnswer)) {
        return parentAnswer.some((v) => allowedValues.includes(v));
    }
    return allowedValues.includes(parentAnswer);
}

// una pregunta con dependencia solo se muestra si su(s) condición(es)
// se cumplen. `dependsOn` puede ser un solo objeto o un array de objetos;
// `dependsOnLogic` decide si deben cumplirse todas ("and", default) o
// con que una alcance ("or").
function isQuestionVisible(question, answers) {
    if (!question.dependsOn) return true;

    const conditions = Array.isArray(question.dependsOn)
        ? question.dependsOn
        : [question.dependsOn];

    if (conditions.length === 0) return true;

    const logic = question.dependsOnLogic === "or" ? "or" : "and";

    return logic === "or"
        ? conditions.some((c) => isConditionMet(c, answers))
        : conditions.every((c) => isConditionMet(c, answers));
}

function isAnswerEmpty(answer) {
    if (answer === undefined || answer === null) return true;
    if (Array.isArray(answer)) return answer.length === 0;
    return String(answer).trim() === "";
}

export default function DynamicForm({
    questions,
    title,
    description,
    onSubmit,
}) {
    const [answers, setAnswers] = useState({});
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const visibleQuestions = questions.filter((q) => isQuestionVisible(q, answers));

    function setAnswer(questionId, value) {
        setAnswers((prev) => ({ ...prev, [questionId]: value }));
        setErrors((prev) => ({ ...prev, [questionId]: undefined }));
    }

    function toggleMultipleChoice(questionId, optionValue, checked) {
        const current = Array.isArray(answers[questionId]) ? answers[questionId] : [];
        const next = checked
            ? [...current, optionValue]
            : current.filter((v) => v !== optionValue);
        setAnswer(questionId, next);
    }

    function validate() {
        const nextErrors = {};
        visibleQuestions.forEach((q) => {
            if (q.required && isAnswerEmpty(answers[q.id])) {
                nextErrors[q.id] = "Esta pregunta es obligatoria.";
            }
        });
        setErrors(nextErrors);
        return Object.keys(nextErrors).length === 0;
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!validate()) return;

        // solo se envían las respuestas de preguntas que quedaron visibles
        const visibleIds = new Set(visibleQuestions.map((q) => q.id));
        const finalAnswers = Object.fromEntries(
            Object.entries(answers).filter(([id]) => visibleIds.has(id))
        );

        onSubmit?.(finalAnswers);
        setSubmitted(true);
    }

    function renderField(question) {
        const value = answers[question.id];
        const textInputType = TEXT_INPUT_TYPES[question.type];

        if (textInputType) {
            return (
                <input
                    className="dform__input"
                    type={textInputType}
                    value={value ?? ""}
                    placeholder={question.placeholder}
                    onChange={(e) => setAnswer(question.id, e.target.value)}
                />
            );
        }

        if (question.type === "long_text") {
            return (
                <textarea
                    className="dform__textarea"
                    value={value ?? ""}
                    placeholder={question.placeholder}
                    onChange={(e) => setAnswer(question.id, e.target.value)}
                />
            );
        }

        if (question.type === "select") {
            return (
                <select
                    className="dform__select"
                    value={value ?? ""}
                    onChange={(e) => setAnswer(question.id, e.target.value)}
                >
                    <option value="" disabled>
                        Selecciona una opción
                    </option>
                    {(question.options ?? []).map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            );
        }

        if (question.type === "single_choice") {
            return (
                <div className="dform__options">
                    {(question.options ?? []).map((opt) => (
                        <label key={opt.value} className="dform__radio">
                            <input
                                type="radio"
                                name={question.id}
                                checked={value === opt.value}
                                onChange={() => setAnswer(question.id, opt.value)}
                            />
                            <span>{opt.label}</span>
                        </label>
                    ))}
                </div>
            );
        }

        if (question.type === "multiple_choice") {
            return (
                <div className="dform__options">
                    {(question.options ?? []).map((opt) => {
                        const checked = Array.isArray(value) && value.includes(opt.value);
                        return (
                            <label key={opt.value} className="dform__checkbox">
                                <input
                                    type="checkbox"
                                    checked={checked}
                                    onChange={(e) =>
                                        toggleMultipleChoice(question.id, opt.value, e.target.checked)
                                    }
                                />
                                <span>{opt.label}</span>
                            </label>
                        );
                    })}
                </div>
            );
        }

        // tipo no reconocido
        return (
            <p className="dform__error">
                Tipo de pregunta desconocido: "{question.type}"
            </p>
        );
    }

    return (
        <form className="dform" onSubmit={handleSubmit} noValidate>
            {title && <h2 className="dform__title">{title}</h2>}
            {description && <p className="dform__description">{description}</p>}

            {visibleQuestions.map((question) => (
                <div
                    key={question.id}
                    className={`dform__field${errors[question.id] ? " dform__field--invalid" : ""}`}
                >
                    <label className="dform__label">
                        {question.label}
                        {question.required && <span className="dform__required">*</span>}
                    </label>
                    {question.helpText && <p className="dform__help">{question.helpText}</p>}

                    {renderField(question)}

                    {errors[question.id] && (
                        <p className="dform__error">{errors[question.id]}</p>
                    )}
                </div>
            ))}

            <button type="submit" className="dform__submit">
                Enviar
            </button>

            {submitted && (
                <p className="dform__success">¡Respuestas enviadas correctamente!</p>
            )}
        </form>
    );
}