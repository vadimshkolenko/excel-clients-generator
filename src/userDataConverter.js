export default (users) => {
  const convertedUsersData = []
  const userDataLines = users.split('\n')

  for (let i = 0; i < userDataLines.length; i++) {
    let name = ''
    let phoneNumber = ''
    const splitLine = userDataLines[i].split(/\s+/g)

    if (!splitLine[1]) {
      continue
    }

    const borderIndex = splitLine[1]?.indexOf('8')

    name = splitLine[1]
    phoneNumber = splitLine[2]

    if (borderIndex !== -1) {
      name = splitLine[1].slice(0, 7)
      phoneNumber = splitLine[1].slice(7)
    } else if (!Number(splitLine[2])) {
      phoneNumber = splitLine[3]
    }

    if (!Number(phoneNumber)) {
      continue
    }

    convertedUsersData.push([name, phoneNumber])
  }

  return convertedUsersData
}
