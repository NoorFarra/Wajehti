import React, { useRef } from "react";
import emailjs from "emailjs-com";

const Form = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_awmet5h", 
        "template_i9ftl0h", 
        form.current,
        "-SfdwkUEfbur0zi1Z" 
      )
      .then(
        (result) => {
          console.log("تم الإرسال ✅", result.text);
          alert("تم إرسال رسالتك بنجاح!");
        },
        (error) => {
          console.log("خطأ ❌", error.text);
          alert("صار خطأ أثناء الإرسال");
        }
      );
      e.preventDefault();
  };

  return (
    <form ref={form} onSubmit={sendEmail} className="flex flex-col space-y-4 w-[300px]">
      <input type="text" name="user_name" placeholder="Your Name" className="border text-center bg-white p-2 rounded" required />
      <input type="email" name="user_email" placeholder="Your Email" className="border text-center bg-white p-2 rounded" required />
      <textarea name="message" placeholder="Your Message" className="border text-center bg-white p-2 rounded" required />
      <button type="submit" className="bg-red-600 text-white py-2 rounded">SEND</button>
    </form>
  );
};

export default Form;
