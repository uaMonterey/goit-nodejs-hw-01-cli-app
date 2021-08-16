const { v4 } = require('uuid')
const { Command } = require('commander')
const program = new Command()

const { listContacts, getContactById, removeContact, addContact } = require('./contacts')

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone')

program.parse(process.argv)

const argv = program.opts()

async function invokeAction({ action, id, name, email, phone }) {
  const allContacts = await listContacts()
  switch (action) {
    case 'list':
      console.table(allContacts)
      break

    case 'get':
      const contactById = await getContactById(id)
      console.table(getContactById)
      break

    case 'add':
      const contactAdd = await addContact(name, email, phone)
      console.log(contactAdd)
      break

    case 'remove':
      const delContact = await removeContact(id)
      console.log(delContact)
      break

    default:
      console.warn('\x1B[31m Unknown action type!')
  }
}

invokeAction(argv)
