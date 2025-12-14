// const api = "http://localhost:4000/api/contact";
const api = "http://admin.dijimgroup.com/api/contact";


const form = document.getElementById("contact_form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  const payload = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("number"),
    service: formData.get("subject"),
    message: formData.get("message"),
  };

  try {
    const res = await fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    document.querySelector(".form-messages").textContent =
      "Message sent successfully ✅";
    form.reset();
  } catch (err) {
    document.querySelector(".form-messages").textContent =
      "Failed to send message ❌";
    console.error(err);
  }
});
