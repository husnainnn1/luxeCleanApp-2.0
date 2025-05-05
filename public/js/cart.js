document.addEventListener("DOMContentLoaded", function () {
  const today = new Date().toISOString().split("T")[0]; // Get today's date in yyyy-mm-dd
  const pickupDate = document.getElementById("pickupDate");
  const checkoutBtn = document.getElementById("checkoutBtn");
  const selectedText = document.getElementById("selectedDateText");

  if (pickupDate) {
    pickupDate.setAttribute("min", today); // Prevent selecting a past date
  }

  // Grab modal-related elements
  const openDateBtn = document.getElementById("openDateBtn");
  const closeModal = document.getElementById("closeModal");
  const confirmDateBtn = document.getElementById("confirmDateBtn");
  const dateModal = document.getElementById("dateModal");
  const hiddenDate = document.getElementById("hiddenDeliveryDate");

  // Show modal on click
  if (openDateBtn && dateModal) {
    openDateBtn.addEventListener("click", function () {
      dateModal.style.display = "block";
    });
  }

  // Hide modal if user cancels
  if (closeModal && dateModal) {
    closeModal.addEventListener("click", function () {
      dateModal.style.display = "none";
    });
  }

  // Confirm selected date and show on UI
  if (confirmDateBtn && hiddenDate && pickupDate) {
    confirmDateBtn.addEventListener("click", function () {
      const selectedDate = pickupDate.value;

      if (selectedDate) {
        const formatted = new Date(selectedDate).toLocaleDateString("en-GB");
        selectedText.innerText = "Selected Pickup/Delivery Date: " + formatted;

        hiddenDate.value = selectedDate;
        checkoutBtn.disabled = false;
        dateModal.style.display = "none";
      } else {
        alert("Please select a valid date.");
      }
    });
  }
});
