import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GLOBALTYPES } from "../redux/actions/globalTypes";
import { checkImage } from "../utils/imageUpload";
import { createPost } from "../redux/actions/postAction";
import UserCard from "./UserCard";

const StatusModal = () => {
    const [content, setContent] = useState("");
    const [images, setImages] = useState([]);
    const [stream, setStream] = useState(false);
    const videoRef = useRef();
    const refCanvas = useRef();
    const [tracks, setTracks] = useState("");

    const { auth, theme } = useSelector((state) => state);
    const dispatch = useDispatch();

    const handleImageChange = (e) => {
        const files = [...e.target.files];
        const { err, NewImages } = checkImage(files);
        if (err) dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } });
        setImages([...images, ...NewImages]);
    };

    const deleteImage = (index) => {
        let newImages = images.filter((image, i) => i !== index);
        setImages(newImages);
    };
    const handleStream = () => {
        setStream(true);
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices
                .getUserMedia({ video: true })
                .then((mediaStream) => {
                    videoRef.current.srcObject = mediaStream;
                    videoRef.current.play();
                    const track = mediaStream.getTracks();
                    setTracks(track[0]);
                })
                .catch((err) => dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } }));
        }
    };

    const handleCapture = () => {
        const width = videoRef.current.clientWidth;
        const height = videoRef.current.clientHeight;

        refCanvas.current.setAttribute("width", width);
        refCanvas.current.setAttribute("height", height);

        const ctx = refCanvas.current.getContext("2d");
        ctx.drawImage(videoRef.current, 0, 0, width, height);
        let URL = refCanvas.current.toDataURL();
        setImages([...images, { camera: URL }]);
    };

    const handleStreamStop = () => {
        tracks.stop();
        setStream(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createPost({ content, images, auth }));
        setContent("");
        setImages([]);
        if (tracks) tracks.stop();
        dispatch({ type: GLOBALTYPES.STATUS, payload: false });
    };
    return (
        <div className="status_modal">
            <form onSubmit={handleSubmit}>
                <div className="status_header">
                    <h5 className="m-0  ">Create Post</h5>
                    <span onClick={() => dispatch({ type: GLOBALTYPES.STATUS, payload: false })}>
                        &times;
                    </span>
                </div>
                <div className="status_body">
                    <UserCard user={auth.user} />
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        name="content"
                        placeholder={`${auth.user.username} What are you thinking?`}
                    ></textarea>
                    <div className="show_images">
                        {images.map((img, i) => (
                            <div key={i} className="file_images">
                                <img
                                    src={img.camera ? img.camera : URL.createObjectURL(img)}
                                    alt="image"
                                    className="img-thumbnail rounded"
                                    style={{ filter: theme ? "invert(1)" : "invert(0)" }}
                                />
                                <span onClick={() => deleteImage(i)}>&times;</span>
                            </div>
                        ))}
                    </div>
                    {stream && (
                        <div className="stream position-relative">
                            <video
                                src=""
                                autoPlay
                                ref={videoRef}
                                width="100%"
                                height="100%"
                                style={{ filter: theme ? "invert(1)" : "invert(0)" }}
                            />
                            <span onClick={handleStreamStop}>&times;</span>
                            <canvas ref={refCanvas} className="d-none" />
                        </div>
                    )}

                    <div className="input_images d-flex">
                        {stream ? (
                            <i className="fas fa-camera" onClick={handleCapture} />
                        ) : (
                            <>
                                <i className="fas fa-camera" onClick={handleStream} />
                                <div className="file_upload">
                                    <i className="fa fa-image" />
                                    <input
                                        type="file"
                                        name="file"
                                        id="file"
                                        multiple
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
                                </div>
                            </>
                        )}
                    </div>
                </div>
                <div className="status_footer my-2">
                    <button className="btn btn-secondary " type="submit">
                        Post
                    </button>
                </div>
            </form>
        </div>
    );
};

export default StatusModal;
