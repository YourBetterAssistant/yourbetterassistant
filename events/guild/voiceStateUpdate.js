module.exports = async (client, oldState, newState) => {
  const server_queue = client.queue.get(oldState.guild.id);
  if (
    server_queue &&
    newState.id == client.user.id &&
    oldState.channelId &&
    !newState.channelId
  ) {
    server_queue?.player.stop();
    server_queue.player.queue.tracks.length = 0;
  } else if (
    newState.id === client.user.id &&
    newState.channelId &&
    !newState.selfDeaf
  ) {
    console.log("Deaf");
    await newState.setDeaf(true);
    await newState.setMute(false);
  }
};
