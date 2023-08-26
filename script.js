import naveMenue from "./JonFiles/naveMenu.json" assert { type: "json" };
import moreAboutUs from "./JonFiles/moreAboutUs.json" assert { type: "json" };
function sideOptions() {
  let navMeueItems = "";
  naveMenue.map((i) => {
    navMeueItems += `
     <div class='navmin'>
     <p>${i.id}<p>
     <p> ${i.name}</p>
     </div>
     `;
  });
  document.querySelector(".navMenu").innerHTML = navMeueItems;
}
addEventListener("DOMContentLoaded", sideOptions);

function aboutUsOptions() {
  let moreAbtUsItems = "";
  moreAboutUs.map((i) => {
    moreAbtUsItems += `
     <div class='navmin'>
     <p>${i.id}<p>
     <p> ${i.name}</p>
     </div>
     `;
  });
  document.querySelector(".AboutUsMenu").innerHTML = moreAbtUsItems;
}
addEventListener("DOMContentLoaded", aboutUsOptions);
let foodDetails;
async function getMenu() {
  try {
    let foodItems = await fetch(
      " https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json"
    );

    foodDetails = await foodItems.json();
  } catch (error) {
    console.log(error);
  }
  let foodMenu = "";
  foodDetails.map((i) => {
    foodMenu += `
    <div class="foodItem">
    <div class="foodItemPic">
      <img
        class="foodItemPic"
        src=${i.imgSrc}
        alt="foodItem"
      />
    </div>
    <div class="addItemsAndPrice">
      <div class="foodAndPrice">
        <p class="foodName">${i.name}</p>
        <p>$ ${i.price}</p>
      </div>
      <div class="addItems">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
        >
          <path
            d="M16 6.66663V25.3333"
            stroke="#878787"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M6.66663 16H25.3333"
            stroke="#878787"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </div>
  </div>
    `;
  });
  document.querySelector(".foodItems").innerHTML = foodMenu;
  async function takeOrder() {
    return new Promise(async (resolve) => {
      await new Promise((resolveTimeout) => setTimeout(resolveTimeout, 2500));

      const order = {
        items: [],
      };

      const burgerItems = foodDetails.filter((item) => item.name === "burgers");
      const randomBurgers = getRandomItems(burgerItems, 3);

      order.items = randomBurgers;

      resolve(order);
    });
  }

  function getRandomItems(array, count) {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }
}
addEventListener("DOMContentLoaded", getMenu);
document.querySelector(".addItems").addEventListener("click", async () => {
  try {
    const order = await takeOrder();
    console.log("Order:", order);
  } catch (error) {
    console.error("Error taking order:", error);
  }
});
