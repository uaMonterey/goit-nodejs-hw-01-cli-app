const { Command } = require('commander')
const program = new Command()

const contacts = require('./contacts')

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone')

program.parse(process.argv)

const argv = program.opts()

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const allContacts = await contacts.listContacts()
      console.table(allContacts)
      break

    case 'get':
      const contactById = await contacts.getContactById(id)
      console.table(contactById)
      break

    case 'add':
      const contactAdd = await contacts.addContact(name, email, phone)
      console.table(contactAdd)
      console.log(`Contact ${name} was successfully added`)
      break

    case 'remove':
      const delContact = await contacts.removeContact(id)
      console.table(delContact)
      console.log(`Contact with ${id} was successfully deleted`)
      break

    default:
      console.warn('\x1B[31m Unknown action type!')
  }
}

invokeAction(argv)
