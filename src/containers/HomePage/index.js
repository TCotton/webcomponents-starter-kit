import { homepageComponent } from './components.js';
import { render } from './childIndex.js';

homepageComponent();
render('<hello-message>Andy</hello-message>');

/*render(homepageComponent({
 message: `This application is rendered using
 ${self.__supportsScriptTypeModule ? 'ES modules' : ' System.register scripts'}.`
 }));*/
