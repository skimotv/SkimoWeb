'use strict';

import $ from 'jquery';
//import MaterialUtils from './Utils';
import {Utils} from './Utils';
export default class SkimoPage {

  constructor() {}

  /**
   * Loads the skimo's JSON-data and inserts one card per entry (only once).
   */
  async loadSkimos(skimoId) {

    this.skimoId = skimoId;
    $.ajax({
      url: 'http://0.0.0.0:2345/skimo/' + skimoId,
      context: this,
      error: function(result) {
        console.log("Server error", result);
        $('#add2').prop('disabled', false);
      },
      success: (result) => this.createCard(result),
      async: true
    });
  }


  /**
   * Returns an Card element.
   */
  createCard(result) {
    if (!result || result.isOk == false) {
      console.log("Request error", result);
      $('#add2').prop('disabled', false);
    } else {
      try {
        let skimoContent = $('#skimo-content');
        //let data = JSON.parse(result);
        let data = result;
        $('#add2').prop('disabled', true);
        for (let i = 0; i < data.elements.length; i++) {
          let skimo = data.elements[i];
          skimo.id = Utils.escapeHtml(skimo.id.toString());
          skimo.end = Utils.escapeHtml(skimo.end.toString());
          skimo.skimo = Utils.escapeHtml(skimo.skimo.toString());
          skimo.start = Utils.escapeHtml(skimo.start.toString());
          skimo.text = Utils.escapeHtml(skimo.text.toString());
          if(document.getElementById('skimo-card-'+skimo.id)) {
            continue;
          }
          if (skimo.skimo === "Skimo") {
            let startminute = (skimo.start / 60 >= 10) ? Math.floor(skimo.start / 60) : "0" + Math.floor(skimo.start / 60);
            let startsecond = (skimo.start % 60 >= 10) ? skimo.start % 60 : "0" + (skimo.start % 60);
            let endminute = (skimo.end / 60 >= 10) ? Math.floor(skimo.end / 60) : "0" + Math.floor(skimo.end / 60);
            let endsecond = (skimo.end % 60 >= 10) ? skimo.end % 60 : "0" + (skimo.end % 60);
            const skimoLink = "https://www.netflix.com/watch/"+this.skimoId+"?t="+skimo.start;
            const element = $(`<div class="fp-help mdl-cell
      mdl-cell--12-col mdl-cell--12-col-tablet mdl-cell--8-col-desktop" id="skimo-card-`+ skimo.id + `">
        <div class="card">
          <div class="card-content">
            <span class="card-title">${startminute}:${startsecond} - ${endminute}:${endsecond}</span>
            <blockquote>
              <p>
                <em>"${skimo.text}"</em>
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
            <a class="skimo-link" href="${skimoLink}" target="_blank">
              <i class="material-icons left">play_arrow</i> Play
            </a>
          </div>
        </div>
      </div>
            `);
            //$('.skimo-link', element).attr('href', `${skimoLink}`);
            skimoContent.append(element);
          }
        }
      } catch (e) {
        console.log(e);
        console.log(result.message);
      }
    }
  }
};
