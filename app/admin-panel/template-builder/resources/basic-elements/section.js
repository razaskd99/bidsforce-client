export const section = (blockManager, basicElementsCat) => {
  let compData = {};
  compData = {
    id: "oneColumns",
    label: `
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />

<i class="fa fa-square fs-4 p-2" title="<section> with <row>"></i>
    <div class="gjs-block-label">Section
    </div>
     
    `,
    category: basicElementsCat,
    content: `
      <section data-gjs-droppable="false" id="oneColumn" >
        <div data-gjs-droppable="false" class="container-fluid">
          <div data-gjs-droppable="true" class="row py-3 main-comp border " style="min-height:75px;">
          </div>
        </div>
      </section>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

      `,
  };

  blockManager.add("oneColumns", compData);
};
