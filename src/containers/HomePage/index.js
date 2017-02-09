import { homepageComponent } from './components.js';
import { render } from './childIndex.js';

render(homepageComponent({
  message: `This application is rendered using
      ${self.__supportsScriptTypeModule ? 'ES modules' : ' System.register scripts'}.`
}));
