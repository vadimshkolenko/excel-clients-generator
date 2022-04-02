import './style.scss'
import exelGenerator from './exelGenerator';

const inputData = document.querySelector('#user-data')
const sheetName = document.querySelector('#sheet-name')
const downloadButton = document.querySelector('#download-button')
const formContainer = document.querySelector('#form-container')
const clientsQuantity = document.querySelector('#clients-quantity')

const errorCreator = () => {
  const errorBlock = document.createElement('div')
  errorBlock.className = 'error-block';
  errorBlock.id = 'error'
  errorBlock.innerHTML = 'Data is not correct';
  formContainer.append(errorBlock)
}

const downloadButtonHandler = () => {
  const errorBlock = document.querySelector('#error')

  if (errorBlock) {
    errorBlock.remove()
  }

  try {
    exelGenerator({
      sheetName: sheetName.value,
      inputData: inputData.value,
      clientsQuantity: Number(clientsQuantity.value)
    })
  } catch (e) {
    errorCreator()
  }
}

downloadButton.addEventListener('click', downloadButtonHandler)
