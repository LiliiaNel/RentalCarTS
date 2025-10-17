import { FC } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import css from './BookingForm.module.css';
import { userSchema } from '../../validation/userSchema'
import DatePickerInput from '../DatePickerInput/DatePickerInput';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


interface BookingFormValues {
  name: string;
  email: string;
  date: string;
  comment: string;
}

const BookingForm:FC = () =>{

  const initialValues: BookingFormValues = {
    name: "",
    email: "",
    date: "",
    comment: "",
  };

  const handleSubmit = (values:BookingFormValues, { resetForm }: FormikHelpers<BookingFormValues>) => {
    console.log("Booking submitted:", values);
     setTimeout(() => {
      toast.success("Your booking has been successfully submitted!", {
        position: "bottom-left",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
      resetForm();
    }, 1000);
  };

  return (<>
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={userSchema}>
      {({ isSubmitting }) => (
          <Form className={css.bookingForm}>
            <h3>Book your car now</h3>
            <p>Stay connected! We are always ready to help you.</p>

            <div className={css.inputsWrapper}>
              <div className={css.inputGroup}>
                <Field type="text" name="name" placeholder="Name*" className={css.inputField} />
                <ErrorMessage name="name" component="div" className={css.error} />
              </div>

              <div className={css.inputGroup}>
                <Field type="email" name="email" placeholder="Email*" className={css.inputField} />
                <ErrorMessage name="email" component="div" className={css.error} />
              </div>

              <div className={css.inputGroup}>
                <DatePickerInput name="date" placeholder="Booking date" className={css.inputField} />
                <ErrorMessage name="date" component="div" className={css.error} />
              </div>

              <div className={css.inputGroup}>
                <Field as="textarea" name="comment" placeholder="Comment" className={css.textAreaField} />
                <ErrorMessage name="comment" component="div" className={css.error} />
              </div>
            </div>

            <button type="submit" className={css.submitButton} disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send"}
            </button>
          </Form>
        )}
    </Formik>
    <ToastContainer />
    </>
  );
}

export default BookingForm;
