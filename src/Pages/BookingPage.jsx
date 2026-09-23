import { Navbar, Footer } from '../components'
import GoogleAppointmentScheduler from '../components/Catfeteria/GoogleAppointmentScheduler.jsx'
const BookingPage = () => {
    return (
        <>
            <Navbar />
            <div></div>
            <GoogleAppointmentScheduler
                scheduleUrl="https://calendar.google.com/calendar/appointments/schedules/AcZssZ1ft6UTs-V_ElsssxhKoM6uqwK9RMtgKJToSCAPjYEVlvUwSVQbAcH7XFuO_fVMG-fU3eFE-4LY?gv=true" />
            <Footer />
        </>
    )
}

export default BookingPage
