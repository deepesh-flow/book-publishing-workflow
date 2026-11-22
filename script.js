/* =========================================================
   PROJECT: BOOK PUBLISHING WORKFLOW SYSTEM
   TECHNOLOGY: Vanilla JavaScript (DOM Manipulation & Events)
   ========================================================= */

// Wait for the DOM to fully load before attaching event listeners
document.addEventListener("DOMContentLoaded", function () {

    // -----------------------------------------------------
    // 1. DYNAMIC COPYRIGHT YEAR (All Pages)
    // -----------------------------------------------------
    const yearElements = document.querySelectorAll(".currentYear");
    const currentYear = new Date().getFullYear();
    yearElements.forEach(function (el) {
        el.textContent = currentYear;
    });

    // -----------------------------------------------------
    // 2. ACTIVE NAVIGATION LINK HIGHLIGHTER (All Pages)
    // -----------------------------------------------------
    // Get the current file name from URL path (defaults to index.html if root)
    let currentPath = window.location.pathname.split("/").pop();
    if (!currentPath || currentPath === "") {
        currentPath = "index.html";
    }

    const navLinks = document.querySelectorAll("nav a");
    navLinks.forEach(function (link) {
        const linkHref = link.getAttribute("href");
        if (linkHref === currentPath) {
            link.style.backgroundColor = "#234B35";
            link.style.color = "#DCC9A3";
            link.style.borderRadius = "4px";
            link.style.borderBottom = "2px solid #DCC9A3";
        }
    });

    // -----------------------------------------------------
    // 3. FORM VALIDATION, SUBMISSION ALERT & RESET CONFIRM
    // (Page: submission.html)
    // -----------------------------------------------------
    const submissionForm = document.getElementById("submissionForm");

    if (submissionForm) {
        submissionForm.addEventListener("submit", function (event) {
            // Prevent default page reload / HTTP submission
            event.preventDefault();

            // Get field values and trim extra whitespace
            const authorName = document.getElementById("authorName").value.trim();
            const authorEmail = document.getElementById("authorEmail").value.trim();
            const bookTitle = document.getElementById("bookTitle").value.trim();
            const description = document.getElementById("description").value.trim();
            const submissionDate = document.getElementById("submissionDate").value;

            // --- Custom Validation Rules ---

            // Rule 1: Author name must have at least 3 letters
            if (authorName.length < 3) {
                alert("Validation Error: Author Name must be at least 3 characters long.");
                document.getElementById("authorName").focus();
                return;
            }

            // Rule 2: Basic email format check
            if (!authorEmail.includes("@") || !authorEmail.includes(".")) {
                alert("Validation Error: Please enter a valid email address (e.g., name@domain.com).");
                document.getElementById("authorEmail").focus();
                return;
            }

            // Rule 3: Book title check
            if (bookTitle.length < 2) {
                alert("Validation Error: Please enter a valid Book Title (at least 2 characters).");
                document.getElementById("bookTitle").focus();
                return;
            }

            // Rule 4: Submission date cannot be empty
            if (!submissionDate) {
                alert("Validation Error: Please select a valid submission date.");
                document.getElementById("submissionDate").focus();
                return;
            }

            // Rule 5: Description / Summary minimum length
            if (description.length < 15) {
                alert("Validation Error: Please provide a slightly more descriptive manuscript summary (minimum 15 characters).");
                document.getElementById("description").focus();
                return;
            }

            // --- If all validations pass: Show Dynamic Success Alert ---
            alert("Success! Manuscript '" + bookTitle + "' by " + authorName + " has been submitted successfully.\nStatus: Pending Editorial Review.");

            // Reset the form fields cleanly
            submissionForm.reset();

            // Reset the character counter back to 0
            const charCounter = document.getElementById("charCounter");
            if (charCounter) {
                charCounter.textContent = "Characters: 0 / 500";
            }
        });

        // Reset confirmation dialog to prevent accidental clearing
        const resetBtn = document.getElementById("resetBtn");
        if (resetBtn) {
            resetBtn.addEventListener("click", function (event) {
                const confirmReset = confirm("Are you sure you want to clear all entered form data?");
                if (!confirmReset) {
                    event.preventDefault(); // Stop reset if user clicks Cancel
                } else {
                    const charCounter = document.getElementById("charCounter");
                    if (charCounter) {
                        charCounter.textContent = "Characters: 0 / 500";
                    }
                }
            });
        }
    }

    // -----------------------------------------------------
    // 4. LIVE CHARACTER COUNTER
    // (Page: submission.html)
    // -----------------------------------------------------
    const descTextarea = document.getElementById("description");
    const charCounter = document.getElementById("charCounter");

    if (descTextarea && charCounter) {
        descTextarea.addEventListener("input", function () {
            const currentLength = descTextarea.value.length;
            charCounter.textContent = "Characters: " + currentLength + " / 500";
        });
    }

    // -----------------------------------------------------
    // 5. LIVE SEARCH & FILTER ON MANUSCRIPTS TABLE
    // (Page: manuscripts.html)
    // -----------------------------------------------------
    const searchInput = document.getElementById("manuscriptSearch");
    const table = document.getElementById("manuscriptTable");

    if (searchInput && table) {
        searchInput.addEventListener("keyup", function () {
            // Get the typed search query in lowercase
            const filterValue = searchInput.value.toLowerCase();
            
            // Get all rows from the table body (tbody)
            const rows = table.getElementsByTagName("tbody")[0].getElementsByTagName("tr");

            // Loop through each table row
            for (let i = 0; i < rows.length; i++) {
                // Get all text content inside the current row in lowercase
                const rowText = rows[i].textContent.toLowerCase();

                // Check if the search query exists in the row's text
                if (rowText.includes(filterValue)) {
                    rows[i].style.display = ""; // Show row
                } else {
                    rows[i].style.display = "none"; // Hide row
                }
            }
        });
    }

    // -----------------------------------------------------
    // 6. INTERACTIVE STATUS FILTER BUTTONS
    // (Page: approvals.html)
    // -----------------------------------------------------
    const filterButtons = document.querySelectorAll(".filter-btn");
    const approvalCards = document.querySelectorAll("#approvals .Card");

    if (filterButtons.length > 0 && approvalCards.length > 0) {
        filterButtons.forEach(function (button) {
            button.addEventListener("click", function () {
                const selectedStatus = button.getAttribute("data-status");

                // Loop through all cards on the approvals page
                approvalCards.forEach(function (card) {
                    const cardStatus = card.getAttribute("data-status");

                    if (selectedStatus === "all" || cardStatus === selectedStatus) {
                        card.style.display = ""; // Show card
                    } else {
                        card.style.display = "none"; // Hide card
                    }
                });
            });
        });
    }

    // -----------------------------------------------------
    // 7. CLICK-TO-TOGGLE STAGE DETAILS (Accordion / Collapse)
    // (Page: workflow.html)
    // -----------------------------------------------------
    const toggleButtons = document.querySelectorAll(".toggle-btn");

    if (toggleButtons.length > 0) {
        toggleButtons.forEach(function (btn) {
            btn.addEventListener("click", function () {
                const targetId = btn.getAttribute("data-target");
                const targetDiv = document.getElementById(targetId);

                if (targetDiv) {
                    if (targetDiv.style.display === "none") {
                        targetDiv.style.display = "block";
                        btn.textContent = "Hide Details";
                    } else {
                        targetDiv.style.display = "none";
                        btn.textContent = "Show Details";
                    }
                }
            });
        });
    }

});
