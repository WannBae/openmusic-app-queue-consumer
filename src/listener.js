/* eslint-disable no-undef */
class Listener {
  constructor(playlistService, mailSender) {
    this._playlistService = playlistService;
    this._mailSender = mailSender;
    this.listen = this.listen.bind(this);
  }
  async listen(message) {
    try {
      const { playlistId, targetEmail } = JSON.parse(
        message.content.toString()
      );

      const playlist = await this._playlistService.getPlaylists(playlistId);
      const songs = await this._playlistService.getSong(playlistId);
      playlist.songs = songs;
      console.log({ playlist });

      const result = await this._mailSender.sendEmail(
        targetEmail,
        JSON.stringify({ playlist })
      );

      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Listener;
