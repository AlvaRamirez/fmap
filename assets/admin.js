//Elementos del DOM
const $listado = document.querySelector('#listado');
const $form_field_lat = document.querySelector('#form_field_lat');
const $form_field_lng = document.querySelector('#form_field_lng');
const $form_field_name = document.querySelector('#form_field_name');
const $form_field_description = document.querySelector('#form_field_description');
const $form_field_type = document.querySelector('#form_field_type');
const $form_field_id = document.querySelector('#form_field_id'); //Se agregó el campo ID como input hidden
const $form_main = document.querySelector('#form_main');




const getHeladerias = async (id = '') => {
    const result = await api.getHeladerias();
    console.log(result)
    if (id == '') {
        $listado.innerHTML = '';
        result.forEach(element => {
            $listado.innerHTML += dataRow(element)
        });
        //Agrego estos dos nuevo EventListeners apenas agrego los elementos nuevos al DOM
        const $btnsDelete = document.querySelectorAll('.handleDelete');
        $btnsDelete.forEach(element => {
            element.addEventListener('click', handleClickDelete)
        });
        const $btnsEdit = document.querySelectorAll('.handleEdit');
        $btnsEdit.forEach(element => {
            element.addEventListener('click', handleClickEdit)
        });
    } else {
        const elementByID = result.find(el => id == el._id)
        return elementByID
    }
}


const dataRow = props => {

    const { _id, lat, lng, name, description, type, web, img } = props

    return `
    
    <div class="item">
    <div class="listado_content">
        <h2 class="titu">${name}</h2>
    </div>
    <div class="btns_wrapper">
        <a href="#" data-id="${_id}" class="botd handleEdit"> <img src="../assets/img/edit.png"></a>
        <a href="#" data-id="${_id}" class="botd handleDelete"><img src="../assets/img/delete.png"></a>
    </div>
</div>

    `
}

getHeladerias();


const deleteHeladeria = async (id) => {

    const result = await api.deleteHeladeria(id);
    console.log('Deleted')
    getHeladerias();

}

const handleClickDelete = async () => {
    const id = event.target.dataset.id;
    deleteHeladeria(id);
}

//UPDATE
const updateHeladeria = async (data,id) => {
    const result = await api.updateHeladeria(data,id);
    console.log('Updated', result)
    getHeladerias();
}
const handleClickEdit = async () => {
    const id = event.target.dataset.id;
    const reg = await getHeladerias(id);
    completeForm(reg)
}

const completeForm = (reg) => {
    const { lat, lng, name, description, type } = reg;

    $form_field_lat.value = lat
    $form_field_lng.value = lng
    $form_field_name.value = name
    $form_field_description.value = description
    $form_field_type.value = type

}

document.addEventListener('click', async function () {
    if (event.target.matches('.handleDelete')) {
        const id = event.target.dataset.id;
        console.log('click en un boton delete', id);
        deleteHeladeria(id);

    }

    if (event.target.matches('handleEdit')) {
        const id = event.target.dataset.id;
        console.log('click en un boton edit', id);
        const reg = await getHeladerias(id);
        console.log(reg)
    }


}, false)

//CREATE
const createHeladerias = async (data) => {
    const result = await api.createHeladerias(data);
    console.log('Created',result)
    getHeladerias();
}

//FORM (Update o Create)
$form_main.addEventListener('submit', (event) => {
    event.preventDefault();
    const id = $form_field_id.value
    const formData = {
        "lat": $form_field_lat.value,
        "lng": $form_field_lng.value,
        "name": $form_field_name.value,
        "description": $form_field_description.value,
        "type": $form_field_type.value
    }
    updateHeladeria(formData,id);
    

    //Reseteo el form
    $form_field_id.value = '';
    $form_main.reset();
})
