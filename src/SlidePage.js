'use strict';

import $ from 'jquery';
import MaterialUtils from './Utils';

export default class SlidePage {

  constructor() {}

  /**
   * Loads the slide's JSON-data and inserts one card per entry (only once).
   */
  async loadSlides(slideId) {

    this.slideId = slideId;
    $.ajax({
      url: 'http://0.0.0.0:2345/skimo/' + slideId,
      context: this,
      error: function(result) {
        console.log("Server error", result);
        $('#add2').prop('disabled', false);
      },
      success: function (result) {
        if (result.isOk == false) {
          console.log("Request error", result);
          $('#add2').prop('disabled', false);
        } else {
          try {
            let slidePage = $('#slide-content');
            let data = JSON.parse(result);
            $('#add2').prop('disabled', true);
            for (let i = 0; i < data.elements.length; i++) {
              let slide = data.elements[i];
              if(document.getElementById('slide-card-'+slide.id)) {
                continue;
              }
              if (slide.skimo === "Skimo") {
                let startminute = (slide.start / 60 >= 10) ? Math.floor(slide.start / 60) : "0" + Math.floor(slide.start / 60);
                let startsecond = (slide.start % 60 >= 10) ? slide.start % 60 : "0" + (slide.start % 60);
                let endminute = (slide.end / 60 >= 10) ? Math.floor(slide.end / 60) : "0" + Math.floor(slide.end / 60);
                let endsecond = (slide.end % 60 >= 10) ? slide.end % 60 : "0" + (slide.end % 60);
                const element = $(`
          <div class="fp-help mdl-cell
          mdl-cell--12-col mdl-cell--12-col-tablet mdl-cell--8-col-desktop" id="slide-card-`+ slide.id + `">
            <div class="card">
              <div class="card-content">
                <span class="card-title">`+ startminute + `:` + startsecond + ` - ` + endminute + `:` + endsecond + `</span>
                <blockquote>
                  <p>
                    <em>"`+ slide.text + `"</em>
                  </p>
                  <small>
                    <div style="margin-bottom: -25px;">
                        <i class="material-icons">favorite</i><span class="likes">0</span>
                        <i class="material-icons">mode_comment</i><span class="comments">0</span>
                    </div>
                  </small>
                </blockquote>
              </div>
              <div class="card-action">
                <a href="https://www.netflix.com/watch/`+slide.id+`?t=`+slide.start+`" target="_blank">
                  <i class="material-icons left">play_arrow</i> Play
                </a>
              </div>
            </div>
          </div>
                `);
                slidePage.append(element);
              }
            }
          } catch (e) {
            console.log(e);
            console.log(result.message);
          }
        }
      },
      async: true
    });
  }


  /**
   * Returns an Card element.
   */
  static createCard(slideId, end, start, text) {
    let startminute = (start / 60 >= 10) ? Math.floor(start / 60) : "0" + Math.floor(start / 60);
    let startsecond = (start % 60 >= 10) ? start % 60 : "0" + (start % 60);
    let endminute = (end / 60 >= 10) ? Math.floor(end / 60) : "0" + Math.floor(end / 60);
    let endsecond = (end % 60 >= 10) ? end % 60 : "0" + (end % 60);
    const element = $(`
    <div class="wide-card mdl-card mdl-shadow--2dp through mdl-shadow--16dp" id="slide-card-`+ slideId + `">
      <div class="mdl-card__title">
        <h2 class="mdl-card__title-text">`+ startminute + `:` + startsecond + ` - ` + endminute + `:` + endsecond + `</h2>
      </div>

      <blockquote>
        <p> <em>"`+ text + `"</em>
        </p>
        <small>`+ startminute + `:` + startsecond + ` - ` + endminute + `:` + endsecond + `</small>
      </blockquote>

      <div class="mdl-card__menu">
        <a class="mdl-button mdl-js-button mdl-js-ripple-effect">
          <i class="material-icons left">play_arrow</i>Play
        </a>
      </div>
    </div>`
    );
    $('.mdl-card', element).css('margin: 5px;');

    return element;
  }
};
