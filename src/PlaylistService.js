/* eslint-disable no-undef */
const { Pool } = require("pg");

class PlaylistService {
  constructor() {
    this._pool = new Pool();
  }

  async getPlaylists(playlistId) {
    const queryPlaylist = {
      text: "SELECT id,name FROM playlist WHERE id = $1",
      values: [playlistId],
    };

    const result = await this._pool.query(queryPlaylist);
    return result.rows[0];
  }
  async getSong(playlistId) {
    const querySongs = {
      text: `SELECT songs.id, songs.title, songs.performer FROM playlistsongs
      LEFT JOIN songs ON songs.id = playlistsongs.song_id
      WHERE playlistsongs.playlist_id = $1`,
      values: [playlistId],
    };
    const result = await this._pool.query(querySongs);
    return result.rows;
  }
}

module.exports = PlaylistService;
