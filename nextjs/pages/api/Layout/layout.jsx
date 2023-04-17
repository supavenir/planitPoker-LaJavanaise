import Head from "next/head";
import React, {useState} from "react";
import {AppstoreOutlined, DownCircleTwoTone} from '@ant-design/icons';
import {Menu} from "antd";

import Image from 'next/image'
import logo from '@/public/planit_poker_logo-no-blanc.png'



const items = [
    {
        label:  (<a href="/"   rel="noopener noreferrer">
            <Image
                alt="logo"
                src={logo}
                width={700}
                height={475}
                sizes="100vw"
                style={{
                    width: '100%',
                    height: 'auto',
                }}
            />
        </a>),
        key: 'mail',

    },

    {
        label: (
            <a href="/rooms/form"   rel="noopener noreferrer">
               inscription
            </a>
        ),
        key: 'alipay',
        icon:  <DownCircleTwoTone />,
    },
    {
        label: (
            <a href="/rooms"   rel="noopener noreferrer">
                Liste de mes rooms
            </a>
        ),
        key: 'rooms',
        icon:  <AppstoreOutlined />,
    },


];




const Layout = ({ children }) => {


    const [current, setCurrent] = useState('mail');
    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };

  return (
    <>
      <Head>
        <title>Create Next App</title>
          <link rel="icon" href="planit_poker_logo-no-blanc.ico" />
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>


        <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
      {children}
      <footer>
      </footer>
    </>
  );
};

export default Layout;