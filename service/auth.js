const sessionIdToUserMap = new Map();

function setUser(id, user) {
  // console.log(`Setting user for sessionId: ${id}`);
  sessionIdToUserMap.set(id, user);
}

function getUser(id) {
  // console.log(`Setting user for sessionId: ${id}`);
  return sessionIdToUserMap.get(id);
}

module.exports = {
  setUser,
  getUser,
};
