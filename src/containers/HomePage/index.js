import { homepageComponent } from './components.js';
import { render } from './childIndex.js';

homepageComponent();

document.querySelector('.top').innerHTML = `<x-product data-name="Ruby" data-img="https://s3-us-west-2.amazonaws.com/s.cdpn.io/4621/ruby.png" data-url="http://example.com/1"></x-product>
  <x-product data-name="JavaScript" data-img="https://s3-us-west-2.amazonaws.com/s.cdpn.io/4621/javascript.png" data-url="http://example.com/2"></x-product>
  <x-product data-name="Python" data-img="https://s3-us-west-2.amazonaws.com/s.cdpn.io/4621/python.png" data-url="http://example.com/3"></x-product>`;

document.querySelector('.bottom').innerHTML = `<x-product data-name="Ruby" data-img="https://s3-us-west-2.amazonaws.com/s.cdpn.io/4621/ruby.png" data-url="http://example.com/1"></x-product>
  <x-product data-name="JavaScript" data-img="https://s3-us-west-2.amazonaws.com/s.cdpn.io/4621/javascript.png" data-url="http://example.com/2"></x-product>
  <x-product data-name="Python" data-img="https://s3-us-west-2.amazonaws.com/s.cdpn.io/4621/python.png" data-url="http://example.com/3"></x-product>`;

/*render(homepageComponent({
 message: `This application is rendered using
 ${self.__supportsScriptTypeModule ? 'ES modules' : ' System.register scripts'}.`
 }));*/
