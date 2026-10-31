// ==============================
// KACEY & ELLIOTT RSVP FORM
// ==============================

const rsvpForm = document.getElementById("rsvp-form");

const attendanceOptions =
    document.querySelectorAll('input[name="Attending"]');

const attendeeSection =
    document.getElementById("attendee-section");

const attendeeFields =
    document.getElementById("attendee-fields");

const addAttendeeButton =
    document.getElementById("add-attendee");

const rsvpStatus =
    document.getElementById("rsvp-status");


let attendeeCount = 1;


/* ==============================
   SHOW ATTENDEE NAMES IF YES
============================== */

attendanceOptions.forEach(option => {

    option.addEventListener("change", function () {

        const firstAttendee =
            document.querySelector(".attendee-input");

        if (this.value === "Yes") {

            attendeeSection.classList.add("visible");

            firstAttendee.required = true;

        } else {

            attendeeSection.classList.remove("visible");

            firstAttendee.required = false;

        }

    });

});


/* ==============================
   ADD ATTENDEE
============================== */

addAttendeeButton.addEventListener("click", function () {

    attendeeCount++;

    const row = document.createElement("div");

    row.className = "attendee-row";


    const input = document.createElement("input");

    input.type = "text";

    input.className = "attendee-input";

    input.name = `Attendee ${attendeeCount}`;

    input.placeholder =
        `Attendee ${attendeeCount} — First and last name`;

    input.required = true;


    const removeButton =
        document.createElement("button");

    removeButton.type = "button";

    removeButton.className = "remove-attendee";

    removeButton.textContent = "Remove";


    removeButton.addEventListener("click", function () {

        row.remove();

    });


    row.appendChild(input);

    row.appendChild(removeButton);

    attendeeFields.appendChild(row);

});


/* ==============================
   SEND RSVP
============================== */

rsvpForm.addEventListener("submit", async function (event) {

    event.preventDefault();


    const submitButton =
        rsvpForm.querySelector('button[type="submit"]');


    submitButton.disabled = true;

    submitButton.textContent = "Sending...";

    rsvpStatus.textContent = "";


    const formData =
        new FormData(rsvpForm);


    try {

        const response = await fetch(
            rsvpForm.action,
            {
                method: "POST",

                body: formData,

                headers: {
                    "Accept": "application/json"
                }
            }
        );


        if (response.ok) {

            rsvpStatus.textContent =
                "Thank you! Your RSVP has been received.";

            rsvpForm.reset();

            attendeeSection.classList.remove("visible");

        } else {

            rsvpStatus.textContent =
                "Something went wrong. Please try again.";

        }


    } catch (error) {

        rsvpStatus.textContent =
            "Something went wrong. Please try again.";

    }


    submitButton.disabled = false;

    submitButton.textContent = "Submit RSVP";

});
