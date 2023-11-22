import React, { useState, useEffect } from "react";
import axios from "axios";
import { BsPencil, BsTrash } from "react-icons/bs";
import "./Home.css";
import { CiViewList } from "react-icons/ci";
import { IoAdd } from "react-icons/io5";

const API_URL = "https://jsonplaceholder.typicode.com/albums";

const Home = () => {
  const [albums, setAlbums] = useState([]);
  const [newAlbumTitle, setNewAlbumTitle] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [showAllAlbums, setShowAllAlbums] = useState(false);
  const [selectedAlbumId, setSelectedAlbumId] = useState(null);
  const [showAddAlbumModal, setShowAddAlbumModal] = useState(false);
  const [showAlbumsModal, setShowAlbumsModal] = useState(false);

  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => setAlbums(response.data))
      .catch((error) => console.error("Error fetching albums:", error));
  }, []);

  const handleAddAlbum = () => {
    axios
      .post(API_URL, { title: newAlbumTitle })
      .then((response) => setAlbums([...albums, response.data]))
      .catch((error) => console.error("Error adding album:", error));

    setNewAlbumTitle("");
    setShowInput(false);
    setShowAddAlbumModal(false);
  };

  const handleUpdateAlbum = (albumId) => {
    axios
      .put(`${API_URL}/${albumId}`, { title: "Updated Title" })
      .then((response) => {
        setAlbums(
          albums.map((album) => (album.id === albumId ? response.data : album))
        );
        setSelectedAlbumId(null);
      })
      .catch((error) => console.error("Error updating album:", error));
  };

  const handleDeleteAlbum = (albumId) => {
    axios
      .delete(`${API_URL}/${albumId}`)
      .then(() => setAlbums(albums.filter((album) => album.id !== albumId)))
      .catch((error) => console.error("Error deleting album:", error));
  };

  return (
    <div className="home">
      <div className="mainMenu">
        <h4 className="heading">
          Hi! Please go with the provided options below
        </h4>

        <div className="menuItem">
          {/* Show Albums button */}
          <button onClick={() => setShowAlbumsModal(true)}>
            {showAllAlbums ? <CiViewList /> : <CiViewList />}{" "}
            {showAllAlbums ? "Hide Albums" : "Show Albums"}
          </button>
          <button onClick={() => setShowAddAlbumModal(true)}>
            <IoAdd /> Add Album
          </button>
        </div>
      </div>
      {showAlbumsModal && (
        <div className="listModal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowAlbumsModal(false)}>
              &times;
            </span>
            <h4>Albums List</h4>
            <ul>
              {albums.map((album) => (
                <li key={album.id}>
                  <div>
                    <p onClick={() => setSelectedAlbumId(album.id)}>
                      {album.title}
                    </p>
                    {selectedAlbumId === album.id && (
                      <div className="liInnerdiv">
                        <input
                          type="text"
                          placeholder="Add New Name"
                          onChange={(e) =>
                            setAlbums(
                              albums.map((a) =>
                                a.id === album.id
                                  ? { ...a, title: e.target.value }
                                  : a
                              )
                            )
                          }
                        />
                        <button onClick={() => handleUpdateAlbum(album.id)}>
                          <BsPencil />
                        </button>
                        <button onClick={() => handleDeleteAlbum(album.id)}>
                          <BsTrash />
                        </button>
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      {showInput && (
        <div>
          <input
            type="text"
            value={newAlbumTitle}
            onChange={(e) => setNewAlbumTitle(e.target.value)}
          />
          <button onClick={handleAddAlbum}>
            <IoAdd /> Add Album
          </button>
        </div>
      )}

      {showAddAlbumModal && (
        <div className="listModal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowAddAlbumModal(false)}>
              &times;
            </span>
            <h4>Add Album</h4>
            <div className="addmodel">
              <input
                type="text"
                value={newAlbumTitle}
                placeholder="file Name"
                onChange={(e) => setNewAlbumTitle(e.target.value)}
              />
              <button onClick={handleAddAlbum}>
                <IoAdd />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
