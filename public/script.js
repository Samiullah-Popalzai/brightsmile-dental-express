
/* =========================================
   BRIGHTSMILE DENTAL CLINIC
   Frontend JavaScript
========================================= */

// ---------- Mobile Navigation ----------

const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {

        const isOpen = navMenu.classList.toggle("active");

        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );

    });

    // Close navigation after clicking a link.

    navMenu.querySelectorAll("a").forEach((link) => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation menu");

        });

    });

}


// ---------- Current Year ----------

const currentYear = document.getElementById("current-year");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


// ---------- Appointment Date ----------

const appointmentDate = document.getElementById("appointment-date");

if (appointmentDate) {

    const today = new Date();
    const localDate = new Date(
        today.getTime() - today.getTimezoneOffset() * 60000
    ).toISOString().split("T")[0];

    appointmentDate.min = localDate;

}


// ---------- Appointment Form ----------

const appointmentForm = document.getElementById("appointment-form");

const submitButton = document.getElementById("submit-button");

const formStatus = document.getElementById("form-status");


if (appointmentForm) {

    appointmentForm.addEventListener("submit", async (event) => {

        // Prevent the browser's default form submission.

        event.preventDefault();

        // Clear previous feedback.

        formStatus.textContent = "";
        formStatus.className = "form-status";

        // Collect all form fields.

        const formData = new FormData(appointmentForm);

        const appointmentData = Object.fromEntries(
            formData.entries()
        );

        // Prevent multiple submissions.

        submitButton.disabled = true;
        submitButton.textContent = "Sending Request...";

        try {

            // Send appointment data to Express.

            const response = await fetch("/appointments", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(appointmentData)

            });

            // Read the JSON response.

            const result = await response.json();

            // Handle unsuccessful responses.

            if (!response.ok || !result.success) {

                throw new Error(
                    result.message || "Unable to send your appointment request."
                );

            }

            // Display success feedback.

            formStatus.textContent = result.message;

            formStatus.classList.add("success");

            // Clear the form after successful submission.

            appointmentForm.reset();

            // Reset the minimum appointment date.

            if (appointmentDate) {

                const today = new Date();

                appointmentDate.min = new Date(
                    today.getTime() - today.getTimezoneOffset() * 60000
                ).toISOString().split("T")[0];

            }

        } catch (error) {

            console.error("Appointment submission error:", error);

            formStatus.textContent =
                error.message || "Something went wrong. Please try again.";

            formStatus.classList.add("error");

        } finally {

            // Enable the submit button again.

            submitButton.disabled = false;

            submitButton.innerHTML =
                'Send Appointment Request <span>→</span>';

        }

    });

}
