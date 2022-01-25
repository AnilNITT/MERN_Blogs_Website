import React,{useState, useEffect} from 'react'
import axios from "axios";
import { Link } from 'react-router-dom';
import "./Sidebar.css";

const Sidebar = props => {

    const [cats,setCats]=useState([]);

    useEffect(()=>{
        const getCats=async()=>{
            const res=await axios.get("./categories");
            setCats(res.data)
        };
        getCats();
    },[])

    return (
        <div className="sidebar">
        <div className="sidebarItem">
          <span className="sidebarTitle">ABOUT ME</span>
          <img
            src="https://avatars.githubusercontent.com/u/42931974?v=4"
            alt=""
            height="200"
          />
          <p>
            I am Anil Patidar, working in Technorizen software solution company as a MERN Stack developer in INDORE.
          </p>
        </div>
        <div className="sidebarItem">
          <span className="sidebarTitle">CATEGORIES</span>
          <ul className="sidebarList">
            {cats.map((c) => (
              <Link to={`/?cat=${c.name}`} className="link">
              <li className="sidebarListItem">{c.name}</li>
              </Link>
            ))}
          </ul>
        </div>
        <div className="sidebarItem">
          <span className="sidebarTitle">FOLLOW US</span>
          <div className="sidebarSocial">
            <i className="sidebarIcon fab fa-facebook-square"></i>
            <i className="sidebarIcon fab fa-twitter-square"></i>
            <i className="sidebarIcon fab fa-pinterest-square"></i>
            <i className="sidebarIcon fab fa-instagram-square"></i>
          </div>
        </div>
      </div>
    )
}
export default Sidebar
