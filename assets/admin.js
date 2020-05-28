//Elementos del DOM
const $listado = document.querySelector('#listado');
const $form_field_lat = document.querySelector('#form_field_lat');
const $form_field_lng = document.querySelector('#form_field_lng');
const $form_field_name = document.querySelector('#form_field_name');
const $form_field_description = document.querySelector('#form_field_description');
const $form_field_type = document.querySelector('#form_field_type');
const $form_field_id = document.querySelector('#form_field_id'); //Se agregó el campo ID como input hidden
const $form_main = document.querySelector('#form_main');
const $add_button = document.querySelector('.handleAdd');



const getHeladerias = async (id = '') => {
    const result = await api.getHeladerias();
    if (id == '') {
        $listado.innerHTML = '';
        result.forEach(element => {
            $listado.innerHTML += dataRow(element)
        });

        const $btnsDelete = document.querySelectorAll('.handleDelete');
        $btnsDelete.forEach(element => {
            element.addEventListener('click', handleClickDelete)
        });
        const $btnsEdit = document.querySelectorAll('.handleEdit');
        $btnsEdit.forEach(element => {
            element.addEventListener('click', handleClickEdit)
        });
    } else {
        console.log("id",id);
        const elementByID = result.find(el => id == el._id)
        return elementByID
    }
}


const dataRow = props => {

    const { _id, lat, lng, name, description, type } = props

    return `
    
    <div class="item">
    <div class="listado_content">
        <h2 class="titu">${name}</h2>
    </div>
    <div class="btns_wrapper">
        <a href="#"  class="botd handleEdit"> <img data-id="${_id}" src="../assets/img/edit.png"></a>
        <a href="#" class="botd handleDelete"><img data-id="${_id}" src="../assets/img/delete.png"></a>
    </div>
</div>

    `
}

getHeladerias();


const deleteHeladeria = async (id) => {

    const result = await api.deleteHeladeria(id);
    console.log('Deleted', result)
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
const handleClickEdit = async (event) => {
    const id = event.target.dataset.id;
    const reg = await getHeladerias(id);
    $form_main.classList.add("active");
   completeForm(reg)
}

const completeForm = (reg) => {
    const { _id, lat, lng, name, description, type } = reg;
    
    $form_field_lat.value = lat;
    $form_field_lng.value = lng;
    $form_field_name.value = name;
    $form_field_description.value = description;
    $form_field_type.value = type;
    $form_field_id.value = _id;

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
const createHeladeria = async (data) => {
    const result = await api.createHeladeria(data);
    console.log('Created',result)
    getHeladerias();
}

const handleClickAdd = (event) => {
    event.preventDefault();
    $form_field_id.value = '';
    $form_main.reset();
    $form_main.classList.add("active");
    $form_field_lat.focus();
}

$add_button.addEventListener('click', handleClickAdd)


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

    $form_main.classList.remove("active");
    if (id === '') {
        createHeladeria(formData)
    } else {

    updateHeladeria(formData,id);

    }
    

    //Reseteo el form
    $form_field_id.value = '';
    $form_main.reset();
})
