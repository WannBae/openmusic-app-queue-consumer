const { Pool } = require("pg");

class PlaylistService {
  constructor() {
    this._pool = new Pool();
  }

  async getPlaylists(owner) {
    const query = {
      text: `SELECT playlist.id, playlist.name, users.username 
      FROM playlist
      LEFT JOIN users ON users.id = playlist.owner 
      LEFT JOIN collaborations ON collaborations.playlist_id = playlist.id
      WHERE playlist.owner = $1 OR collaborations.user_id = $1`,
      values: [owner],
    };

    const result = await this._pool.query(query);
    return result.rows[0];
  }
}

module.exports = PlaylistService;
