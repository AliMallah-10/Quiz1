document.addEventListener("DOMContentLoaded", function () {
  // Function to add item to the specified list
  function addItemToList(listType, itemName) {
    const listItem = document.createElement("li");

    // Check if it's the "GroupItems" list to exclude the word "Group"
    if (listType !== "Group") {
      listItem.textContent = `${listType}! - ${itemName}`;
    } else {
      listItem.textContent = `${itemName}`;
    }

    listItem.className = `${listType.toLowerCase()}-item`; // Set unique class

    const listContainer = document.getElementById(`${listType}Items`);
    listContainer.appendChild(listItem);
  }
  function highlightSearchResults(searchText) {
    const allItems = document.querySelectorAll(".listItems ul li");
    const matchedItems = [];

    allItems.forEach((item) => {
      if (item.textContent.toLowerCase().includes(searchText.toLowerCase())) {
        item.style.backgroundColor = "red";
        matchedItems.push(item);
      } else {
        item.style.backgroundColor = ""; // Reset background color
      }
    });

    return matchedItems;
  }

  function deleteMatchedItems(matchedItems) {
    matchedItems.forEach((item) => {
      item.remove();
    });
  }
  // Event listener for the "Add To Specific List" button
  document.getElementById("btnAdd").addEventListener("click", function () {
    const radioButtons = document.getElementsByName("radio1");
    let selectedListType;

    for (const radioButton of radioButtons) {
      if (radioButton.checked) {
        selectedListType = radioButton.nextElementSibling.textContent;
        break;
      }
    }

    const itemName = document.getElementById("name").value;

    if (!selectedListType || itemName.trim() === "") {
      alert(
        "Please choose a list type (Fruits or Legumes) and enter an item name."
      );
      return;
    }

    addItemToList(selectedListType, itemName);

    // Clear the input field after adding the item
    document.getElementById("name").value = "";
  });

  // Event listener for the "Add To General List" button
  document.getElementById("btnGeneral").addEventListener("click", function () {
    const radioButtons = document.getElementsByName("radio1");
    let selectedListType;

    for (const radioButton of radioButtons) {
      if (radioButton.checked) {
        selectedListType = radioButton.nextElementSibling.textContent;
        break;
      }
    }

    const itemName = document.getElementById("name").value;

    if (!selectedListType) {
      alert(
        "Please choose a list type (Fruits or Legumes) before clicking Add To General List."
      );
      return;
    }

    if (itemName.trim() === "") {
      alert("Please enter an item name.");
      return;
    }

    addItemToList("Group", `${selectedListType}! - ${itemName}`);

    // Clear the input field after adding the item
    document.getElementById("name").value = "";
  });
  // Event listener for the "Search For Item" button
  document.getElementById("btnsearch").addEventListener("click", function () {
    const searchText = document.getElementById("search").value;
    const matchedItems = highlightSearchResults(searchText);
  });

  // Event listener for the "Delete An Item" button
  document.getElementById("delete").addEventListener("click", function () {
    const searchText = document.getElementById("search").value;
    const matchedItems = highlightSearchResults(searchText);
    deleteMatchedItems(matchedItems);
  });
});
