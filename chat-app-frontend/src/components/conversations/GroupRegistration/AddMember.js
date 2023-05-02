import { useEffect, useState } from "react";
import useCurrentLocalState from "../../../util/storage";
import styles from "./AddMember.module.css";

function useDebounceValue(value, time = 250) {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceValue(value);
    }, time);

    return () => {
      clearTimeout(timeout);
    };
  }, [value, time]);

  return debounceValue;
}

// on search functionality Handle errors like //// after a search
function AddMember(props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState([]);

  const [selectedUser, setSelectedUser] = useState([]);
  const [currUser, _] = useCurrentLocalState("", "user");
  const u2 = JSON.parse(currUser);
  const debounceQuery = useDebounceValue(searchTerm);

  // fetch the users searches users
  useEffect(() => {
    const url = "api/v1/search/users/" + debounceQuery;
    if (debounceQuery.length > 0) {
      fetch(url, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          if (data != null) {
            setSearchData(data);
          }
        });
    } else {
      setSearchData([]);
    }
  }, [debounceQuery]);

  function cancelHandler() {
    props.closeGroup();
    props.close();
  }

  // saves the members of the conversations
  function saveMembers() {
    const convId = props.convId;
    const parsedUser = JSON.parse(currUser);

    const memberAddAll = async () => {
      const url =
        "api/v1/user/" +
        parsedUser["id"] +
        "/conversation/" +
        convId +
        "/messegegroups";

      await fetch(url, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      }).then((response) => console.log(response.json));

      selectedUser.forEach((elem) => {
        const memId = elem["id"];
        const url =
          "api/v1/user/" + memId + "/conversation/" + convId + "/messegegroups";
        const addSelectedUser = async () => {
          await fetch(url, {
            headers: {
              "Content-Type": "application/json",
            },
            method: "POST",
          }).then((response) => console.log(response.json));
        };
        addSelectedUser();
      });

      await fetch(props.fetchString, {
        headers: {
          "Content-Type": "application/json",
          // 'Accept': 'application/json'
        },
        method: "GET",
      })
        .then((response) => {
          const status = response.status;
          if (status === 401 || status === 403) {
            console.log("unauthorized");
          } else if (status === 200) {
            return response.json();
          } else {
            console.log("something went wrong");
          }
        })
        .then((data) => {
          console.log(data);
          props.setConversations(data);
          // props.setSwitchWebsock(true);
        });
    };

    memberAddAll();

    //new code

    //end ofnew code

    props.closeGroup();
    props.close();
  }

  function handleClick(event, display) {
    const id = event.currentTarget.id;
    const temp = {
      id: id,
      display: display,
    };

    var check = false;
    for (var i = 0; i < selectedUser.length; i++) {
      if (!check) {
        const id = selectedUser[i]["id"];
        check = temp["id"] === id;
      } else {
        break;
      }
    }
    if (!check) {
      setSelectedUser((current) => [...current, temp]);
    }

    console.log("In handle Click", selectedUser);
  }

  return (
    <div className="registration">
      <h1>Add Members</h1>
      {/* <h1>{props.convId}</h1> */}

      <div>
        <input
          className="input"
          type="text"
          placeholder="search user"
          id="searchTerm"
          onChange={(elem) => setSearchTerm(elem.target.value)}
        ></input>

        {searchData.length > 0 ? (
          <div className={styles["search-content"]}>
            {searchData.map((elem) => {
              const display = elem["fname"] + " " + elem["lname"];
              return elem["id"] !== u2["id"] ? (
                <li
                  className={styles.li}
                  id={elem["id"]}
                  onClick={(event) => handleClick(event, display)}
                  type="text"
                >
                  {display}
                </li>
              ) : null;
            })}
          </div>
        ) : (
          ""
        )}
      </div>

      {/* this part of the code written to view the selected users and returns  */}

      {selectedUser.length > 0 ? (
        <>
          <h2>Selected User</h2>
          <div className={styles["selected-user"]}>
            {selectedUser.map((elem) => {
              return (
                <div className={styles.selected}>
                  <li style={{ marginBottom: "1rem" }}>{elem["display"]}</li>
                  <button
                    style={{ margin: "0", padding: "0.3rem 0.9rem" }}
                    className="button-28"
                    onClick={() => {
                      setSelectedUser(selectedUser.filter((e) => e !== elem));
                    }}
                  >
                    Delete
                  </button>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        ""
      )}

      <div style={{ marginTop: "1rem" }}>
        <button className="button-28" onClick={cancelHandler}>
          cancel
        </button>
        <button className="button-28 accept" onClick={saveMembers}>
          save
        </button>
      </div>
    </div>
  );
}

export default AddMember;
