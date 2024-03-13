"use client"
import React from 'react'
import 'grapesjs/dist/css/grapes.min.css';
import grapesjs from 'grapesjs';
import gjsPreserWebpage from "grapesjs-preset-webpage";
import Loader from './Loader';



import input from './form-elements/input';
import button from './form-elements/button';
import checkbox from './form-elements/check-box';

const Editor = () => {


    let custPlugins=[input,button,checkbox,gjsPreserWebpage]
    let editor ={}
    setTimeout(() => {
        
    
     editor = grapesjs.init({
        container: "#editor",

    
        styleManager: { clearProperties: 1 },
        storageManager: false,
        storageManager: {
          type: "remote",
          stepsBeforeSave: 1,
          contentTypeJson: true,
          autosave: false,
          plugins: ['gjs-blocks-basic'],
          
        
          storeComponents: true,
          storeStyles: true,
          storeHtml: true,
          storeCss: true,
    
          headers: {},
          id: "mycustom-",
    
          params: {},
          fromElement: true,
          allowScripts: 1,
          selectorManager: { componentFirst: true },
        },
    
        plugins: custPlugins,

        pageManager: {
          pages: [
            {
              id: 'my-first-page',
              styles: '.my-page1-el { color: red }',
              component: '<div class="my-page1-el">Page 1</div>',
            },
            {
              id: 'my-second-page',
              styles: '.my-page2-el { color: blue }',
              component: '<div class="my-page2-el">Page 2</div>',
            },
         ]
        },
       
    
        canvas: {
          styles: [
            "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css",
            "https://cdn.celerantwebservices.com/plugins/fontawesome/4.5.0/fontawesome.min.css",
            "./assets/css/canvas.css",
            "./assets/css/builder.css",
            "./css/style.css",

          ],
          scripts: [
            "https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js",
    
            "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js",
            "https://code.jquery.com/jquery-3.6.0.min.js",
          ],
        },
      }); 



          // START CONTROLLING DEFAULT CATEGORY BLOCKS
    const block = editor.BlockManager.getAll();
    block.map((block) => {
      if (
        block.attributes.id === "text" ||
        block.attributes.id === "image" ||
        block.attributes.id === "link" ||
        block.attributes.id === "video" ||
        block.attributes.id === "link-block" ||
        block.attributes.id === "map" ||
        block.attributes.id === "text-section" ||
        block.attributes.id === "quote"
      ) {
        block.attributes.category = {
          label: "Basic",
          order: 11,
          open: false,
        };
      }
      if (
        block.attributes.id === "h-navbar" ||
        block.attributes.id === "countdown"
      ) {
        block.attributes.category = {
          label: "Extra",
          order: 12,
          open: false,
        };
      } else if (block.attributes.id === "form") {
        block.attributes.category = {
          label: "Forms",
          order: 13,
          open: false,
        };
      } else if (block.attributes.id === "INPUTS") {
        block.attributes.category = {
          label: "test",
          order: 13,
          open: false,
        };
      }
    });
    // END CONTROLLING DEFAULT CATEGORY BLOCKS


  
      
    }, 5000);

      
      


    setTimeout(() => {
      // Get the Pages module first
const pages = editor.Pages;

try{
// Add a new Page
const newPage = pages.add({
  id: 'new-page-id',
  styles: '.my-class { color: red }',
  component: `<div class="card" style="width: 18rem;">
  <img src="..." class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>`,
});


// Select another page by ID
pages.select('new-page-id');

} catch(err){}

    }, 10000);
      
      return (
        
      <div id="editor"><Loader/></div>

    )
}

export default Editor
