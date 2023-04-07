import * as React from 'react';
import { useState, MouseEvent, useEffect, useRef } from "react";

import Layout from "../components/layout"
import Seo from "../components/seo"
import { icon, iconLink, vcr } from "../components/index.module.css"
import styled from 'styled-components';

const links = [
  {
    text: "text me",
    url: "/text-me",
    icon: "icons/text-me.png"
  },
  // TODO: put art map in header
  // {
  //   text: "art map",
  //   url: "/art-map",
  //   icon: "icons/art-map.png"
  // },
  {
    text: "x-sound",
    url: "/x-sound",
    icon: "icons/x-sound.png"
  },
  {
    text: "x-art",
    url: "/x-art",
    icon: "icons/x-art.png"
  },
  {
    text: "cyborg-text",
    url: "/cyborg-text",
    icon: "icons/cyborg-text.png"
  },
]

const Icon = styled.li`
  display: flex;
  text-align: center;
  width: 88px;
  flex-direction: column;
  align-items: center;
  padding: 4px;
  ${({ selected }) =>
    selected &&
    `
    background: rgba(100, 200, 200, 0.3);
    border: 2px dashed rgba(100, 200, 200, 0.9)
  `}
`;

const useOutsideClick = (ref, callback) => {
  const handleClick = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      callback();
    }
  }
  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  });
}
const randomNum = (max: number, min?: number) => Math.floor(Math.random() * max) + (min || 0);
let initializing = true

const IndexPage = () => {
  const [selected, setSelected] = useState(links.map(l => null));
  const listRef = useRef(null);
  const [clicked, setClicked] = useState(links.map(l => false));
  const [dragging, setDragging] = useState(links.map(l => false));
  const [position, setPosition] = useState(links.map(l => ({ top: 0, left: 0 })));
  const [offset, setOffset] = useState(links.map(l => ({ x: 0, y: 0 })));
  const [latestClicked, setLatestClicked] = useState(null);

  useEffect(() => {
    if (initializing)
      setPosition(links.map(l => ({ top: randomNum(window.innerHeight - 240, 142), left: randomNum(window.innerWidth - 120) })))
    initializing = false
  })


  useEffect(() => {
    let timer;
    console.log('effective')
    if (latestClicked !== null && clicked[latestClicked])
      timer = setTimeout(() => { spliceState(setClicked, clicked, latestClicked, false) }, 300);
    return () => clearTimeout(timer);
  }, [clicked]);


  const handleSingleClick = async (event, index) => {
    event.preventDefault();
    await spliceState(setSelected, selected, index, true)
    debugger
    if (clicked[index] && event.currentTarget)
      window.location = event.currentTarget.href
    await spliceState(setClicked, clicked, index, true);
    await setLatestClicked(index);
  }

  const handleDoubleClick = (event) => {
    event.preventDefault();
    window.location = event.currentTarget.href;
  };

  const handleMouseDown = async (event, index) => {
    event.preventDefault();
    console.log("mousedown");

    await spliceState(setDragging, dragging, index, true);
    await spliceState(setOffset, offset, index, {
      x: event.clientX - position[index].top,
      y: event.clientY - position[index].left,
    })
  };

  const spliceState = async (callback: CallableFunction, state: any, index: number, input: any) => {
    await callback([
      ...state.slice(0, index), input,
      ...state.slice(index + 1)
    ])
  }

  const handleMouseMove = async (event, index) => {
    event.preventDefault();
    console.log(event)
    console.log(dragging, event.clientX, event.clientY, position[index].top, position[index].left);
    if (dragging[index]) {
      await spliceState(setPosition, position, index, {
        left: event.clientX - 40,
        top: event.clientY - 40,
      })
    }
  };

  const handleMouseUp = async (event, index) => {
    event.preventDefault();
    console.log('mouseup')
    await spliceState(setDragging, dragging, index, false)
  };


  useOutsideClick(listRef, () => {
    selected.forEach((s, index) => {
      if (s)
        spliceState(setSelected, selected, index, null)
    })
  });

  return (
    <Layout>
      <Seo title="Home" />
      <div>
        art map?
      </div>
      <ul className={vcr} >
        {links.map((link, index) => (

          <a key={index} ref={listRef} href={link.url}
            onClick={(event: MouseEvent) => handleSingleClick(event, index)}
            onDoubleClick={handleDoubleClick}
            onMouseDown={(event) => handleMouseDown(event, index)}
            onMouseMove={(event) => handleMouseMove(event, index)}
            onMouseUp={(event) => handleMouseUp(event, index)}
            draggable={true}
            className={iconLink}
            style={{ top: position[index].top, left: position[index].left }}
          >
            <Icon key={link.url} selected={selected[index]} >
              <img src={link.icon} className={icon} />
              <p>{link.text}</p>
            </Icon>
          </a>
        ))}
      </ul>
    </Layout>
  )
}

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Home" />

export default IndexPage
