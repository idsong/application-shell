/**
 *
 * Copyright 2015 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import Controller from './Controller';
import RouterSingleton from '../libs/RouterSingleton';
import ActivityController from './ActivityController';
import NavDrawerView from './../view/NavDrawerView';

export default class ApplicationController extends Controller {

  constructor() {
    super();

    this.navDrawer = new NavDrawerView();

    this.sideNavToggleButton = document.querySelector('.js-toggle-menu');
    this.sideNavToggleButton.addEventListener('click', () => {
      this.navDrawer.toggle();
    });

    // TODO: Find more elegant solution to this and handling anchors in the
    // web app for dynamically loaded content
    var anchorElements = this.navDrawer.sideNavContent.querySelectorAll('a');
    for (var i = 0; i < anchorElements.length; i++) {
      if (!anchorElements[i].href) {
        continue;
      }

      anchorElements[i].addEventListener('click', (clickEvent) => {
        clickEvent.preventDefault();

        this.navDrawer.close();

        var router = RouterSingleton.getRouter();
        router.goToPath(clickEvent.target.href);
      });
    }

    var router = RouterSingleton.getRouter();
    router.addRoute('/', new ActivityController());
    router.addRoute('/url-1', new ActivityController());
    router.addRoute('/url-2', new ActivityController());
    router.setDefaultRoute(new ActivityController());
    router.requestStateUpdate();
  }
}
