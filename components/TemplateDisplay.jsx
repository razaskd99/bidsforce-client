"use client"
import { getPages, getpage } from '@/app/api/user-templates/API';
import React, { useEffect, useState } from 'react';

export const TemplateDisplay = (props) => {
  const [selectedValue, setSelectedValue] = useState('');
  const [templateHTML, setTemplateHTML] = useState('');
  const [templateCSS, setTemplateCSS] = useState('');

  const [templatesAll, setTemplatesAll] = useState([]);


  useEffect(() => {
    getPages()
      .then((list) => {
        setTemplatesAll(list)
        console.log(list)
      })
      .catch((err) => console.log(err));
  }, []);


   function applyDynamicCSS(css) {
       // Create a <style> element
      const styleElement = document.createElement('style');

       // Set the CSS content of the <style> element
       styleElement.appendChild(document.createTextNode(css));

  //     // Append the <style> element to the <head>
       document.head.appendChild(styleElement);

  //     // Clean up function to remove the dynamically added <style> element
   }

   useEffect(() => {
   applyDynamicCSS(templateCSS);

   return () => {
    document.head.removeChild(styleElement);
  };


  }, [templateHTML]); // Re-run the effect whenever the CSS changes

  const handleSelectChange = async (event, tenantID) => {
    const selectedTemplate = event.target.value;
    setSelectedValue(selectedTemplate);
    // Call your function here with the selected value
    console.log("Selected Value:", selectedTemplate);

  };





  const handleLoadTemplate =async (tenantID) => {
    const selectElement = document.getElementById('templateSelect');
    const selectedValue = selectElement.value;
    const selectedIndex = selectElement.selectedIndex;
    const selectedOption = selectElement.options[selectedIndex];
    const selectedName = selectedOption.text;


    let pageContent = await getpage(selectedName, tenantID)

    try {
      pageContent = JSON.parse(pageContent);
    } catch (err) {
      // Handle parsing error if needed
    }

    let pageHTML = pageContent?.['mycustom-html'] ?? '';
    let pageCSS = pageContent?.['mycustom-css'] ?? '';

    setTemplateHTML(pageHTML)
    setTemplateCSS(pageCSS)


  }



  return (
    <>

      <div class="container  mt-4">
        <div>
          <div>
            <select id="templateSelect"  className="form-select" aria-label="Default select example" style={{ width: '400px', padding: '20px', borderRadius: 0 }} >
              <option value="">Select a template</option>
              {templatesAll.map(template => (
                <option key={template.id} value={template.name}>{template.name}</option>
              ))}
            </select>
          </div>
        </div>
        <button className='btn btn-primary' onClick={()=>{handleLoadTemplate(props.tenantID)}}>Load template</button>

      </div>

      <div dangerouslySetInnerHTML={{ __html: templateHTML }} />

    </>
  )
}
