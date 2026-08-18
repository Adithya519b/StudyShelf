import { useState } from "react";
import api from "../../services/api";
import "../../styles/postMessage.css";

function PostMessage({ senderType = "ADMIN" }) {

    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handlePostMessage = async (e) => {

        e.preventDefault();

        if (!title.trim()) {
            alert("Please enter a title.");
            return;
        }

        if (!message.trim()) {
            alert("Please enter a message.");
            return;
        }

        try {

            setLoading(true);

            let user = null;

            if (senderType === "FACULTY") {

                user = JSON.parse(
                    localStorage.getItem("faculty")
                );

            } else {

                user = JSON.parse(
                    localStorage.getItem("admin")
                );

            }

            await api.post("/notifications", {

                title: title,

                message: message,

                postedBy:
                    user?.name ||
                    (senderType === "FACULTY"
                        ? "Faculty"
                        : "Admin"),

                senderType: senderType

            });

            alert("Announcement posted successfully!");

            setTitle("");
            setMessage("");

        } catch (error) {

            console.error("Post announcement error:", error);

            console.error(
                "Backend response:",
                error.response?.data
            );

            alert(
                error.response?.data?.message ||
                "Failed to post announcement."
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="post-message-card">

            <h2>
                📢 Post Announcement
            </h2>

            <p>
                Send an announcement to all students.
            </p>

            <form onSubmit={handlePostMessage}>

                <input
                    type="text"
                    placeholder="Announcement title"
                    value={title}
                    onChange={(e) =>
                        setTitle(e.target.value)
                    }
                    required
                />

                <textarea
                    placeholder="Enter your announcement..."
                    value={message}
                    onChange={(e) =>
                        setMessage(e.target.value)
                    }
                    rows="5"
                    required
                />

                <button
                    type="submit"
                    disabled={loading}
                >

                    {loading
                        ? "Posting..."
                        : "Post Message"
                    }

                </button>

            </form>

        </div>

    );

}

export default PostMessage;