const AVATAR_URL =
  "https://avatars2.githubusercontent.com/u/44586823?s=460&v=4";
const main = document.querySelector("main");
const tweetBtn = document.querySelector("form");
const myAvatar = [...document.querySelectorAll(".my_avatar")];
const browsegifs = document.querySelector("#browsegifs");
const textarea = document.querySelector("#textarea");
myAvatar.forEach(img => {
  img.src = AVATAR_URL;
});
const imgGifPoll = document.querySelector("#imgGifPoll");
const searchGifBtn = document.querySelector("#searchGifBtn");
const searchGif = document.querySelector("#searchGif");

// this will be our text and any images, gifs and polls the user posts
const tweets = [];

// these gifs will be displayed and will be a subset of originalGifs
// (but it's totally up to you how you want to implement it;
// you could for example just use originalGifs alone)
let gifs = [];

// these gifs are the original JSON we got from our fetch in case we need it
const originalGifs = [];

// this will display all the objects in my tweets array
// where each object contains avatar url, username, name and text
function render() {
  main.innerHTML = tweets
    .map(
      tweet => `
        <aside>
         <div>
            <img class="avatar" src="${tweet.avatar}">
         </div>
         <div class="formatted-tweet">
            <h6><a href="https://twitter.com/${tweet.username}">${tweet.name}</a> <span class="username">@${tweet.username}</span></h6>
            <p>${tweet.tweet}</p>
            <div class="imgGifPoll">
            </div>
            <div>
                <section>
                    <div id="reactions" class="btn-group mr-2">
                        <button
                            type="button"
                            class="btn btn-secondary mdi mdi-message-outline"
                            aria-label="reply"
                        ></button>
                        <button
                            type="button"
                            class="btn btn-secondary mdi mdi-twitter-retweet"
                            aria-label="retweet"
                        ></button>
                        <button
                            type="button"
                            class="btn btn-secondary mdi mdi-heart-outline"
                            aria-label="like"
                            style=""
                        ></button>
                        <button
                            type="button"
                            class="btn btn-secondary mdi mdi-upload"
                            aria-label="share"
                        ></button>
                    </div>
                </section>
            </div>
        </div>
        </aside>
          `
    )
    .join("");
}

function tweeting(e) {
  e.preventDefault();
  const p = document.querySelector("textarea");

  // store tweet text in tweets object
  tweets.unshift({
    avatar: AVATAR_URL,
    name: "Nick Brazda",
    username: "gc200295036",
    tweet: p.value
  });

  // clear textbox and any image
  p.value = "";
  imgGifPoll.innerHTML = "";

  render();
}

// if user selects the image icon in order to insert an image from their comptuer
function handleFileSelect(evt) {
  const reader = new FileReader();

  reader.addEventListener("load", e => {
    imgGifPoll.innerHTML = `<img class="thumb" src="${e.target.result}" style="width: 100%"/>`;
  });

  // Read in the image file as a data URL.
  reader.readAsDataURL(evt.target.files[0]);
}

function fetchGifs() {
  fetch(
    `https://api.giphy.com/v1/gifs/search?q=${searchGif.value}&api_key=TAzHDRwXoKuYhyeXOuJZ4wKMDXhEJIDr&limit=5`
  )
    .then(res => res.json())
    .then(data => {
      gifs = data.data;
      const newHTML = gifs
        .map(
          (gif, i) => `
    <img src="${gif.images.fixed_height_small.url}" data-index="${i}">
    `
        )
        .join();
      browsegifs.innerHTML = newHTML;
      // unhide switch to toggle gif animations
      switchgifsarea.classList.remove("hide");
    });
}
function chooseGif(e) {
  if (!e.target.matches("img")) {
    return;
  }
  const index = e.target.dataset.index;
  browsegifs.innerHTML = `<img src="${gifs[index].images.original.url}">`;
}
// various click/change handlers for the icons and tweet button
document
  .querySelector("#uploadPic")
  .addEventListener("change", handleFileSelect, false);
tweetBtn.addEventListener("submit", tweeting);
searchGifBtn.addEventListener("click", fetchGifs);
browsegifs.addEventListener("click", chooseGif);
