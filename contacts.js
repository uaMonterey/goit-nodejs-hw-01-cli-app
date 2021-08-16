const fs = require('fs').promises
const path = require('path')

const { v4 } = require('uuid')

const contactsPath = path.join(__dirname, 'db/contacts.json')

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath)
    const contacts = JSON.parse(data)
    console.log(contacts)
    return contacts
  } catch (error) {
    throw error
  }
}
const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts()
    const requiredContact = contacts.find((contact) => contact.id === +contactId)
    if (!requiredContact) {
      throw new Error(`Contacts with id=${contactId} not found`)
    }
    console.log(requiredContact)
    return requiredContact
  } catch (error) {
    throw error
  }
}

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts()
    const contactIdx = contacts.findIndex((item) => item.id === contactId)

    if (contactIdx === -1) {
      throw new Error(`Contacts with id=${contactId} not found`)
    }

    const updateContacts = contacts.filter((contact) => contact.id !== contactId)

    await fs.writeFile(contactsPath, JSON.stringify(updateContacts))

    return contacts[contactIdx]
  } catch (error) {
    throw error
  }
}

const addContact = async (name, email, phone) => {
  try {
    const contacts = await listContacts()
    const newContact = {
      id: v4(),
      name,
      email,
      phone,
    }
    contacts.push(newContact)
    await fs.writeFile(contactsPath, JSON.stringify(contacts))
    return newContact
  } catch (error) {
    throw error
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
}
