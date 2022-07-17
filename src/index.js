import "./styles.css";
import $ from "jquery";

$(document).ready(function () {
  var key = "";
  var playlistId = "PL-mzrQ96YAOTsWLZUablQLEcI5w5ngcFD";
  var URL = "https://www.googleapis.com/youtube/v3/playlistItems";
  var options = {
    part: "snippet",
    key: key,
    maxResults: 20,
    playlistId: playlistId
  };

  loadVids();

  function loadVids() {
    $.getJSON(URL, options, function (data) {
      // console.log(data);
      var id = data.items[0].snippet.resourceId.videoId;
      mainVid(id);
      resultsLoop(data);
    });
  }

  function mainVid(id) {
    $("#video").html(`
      <iframe
      width="560"
      height="315"
      src="https://www.youtube.com/embed/${id}"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
      ></iframe>
    `);
  }

  function resultsLoop(data) {
    $.each(data.items, function (i, item) {
      var thumb = item.snippet.thumbnails.medium.url;
      var title = item.snippet.title;
      var desc = item.snippet.description.substring(0, 100);
      var vid = item.snippet.resourceId.videoId;

      $("main").append(`
        <article class="item" data-key="${vid}">
          <img
            src="${thumb}"
            alt=""
            class="thumb"
          />
          <div class="details">
            <h4>${title}</h4>
            <p>${desc}</p>
          </div>
        </article>
      `);
    });

    $("main").on("click", "article", function () {
      //alert("hello");
      var id = $(this).attr("data-key");
      //alert(id);
      mainVid(id);
    });
  }
});
