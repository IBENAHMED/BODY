"use client"

import { Environment, Html, Loader, OrbitControls, useAnimations, useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import React, { Suspense, useEffect, useState } from 'react';

const Avatar = () => {

    let avatar = useGLTF("/myavatar.glb");
    let { actions, names } = useAnimations(avatar.animations, avatar.scene);
    let [index, setIndex] = useState(0);
    let [isClicked, setIsClicked] = useState(false);

    useEffect(() => {
        // actions.dance?.play()
        console.log(index)
        actions[names[index]]?.reset().fadeIn(0.5).play();

        return () => {
            actions[names[index]]?.fadeOut(0.5);
        };
    }, [index]);

    return (
        <group scale={1}>
            <primitive
                object={avatar.scene}
                scale={1.5}
                position-y={-2}
                rotation-y={-0.5}
                position-x={[-1]}
            />
            <Html position={[-1, -3, 0]}>
                <button
                    className="bg-blue-300 text-black w-[100px] p-2 rounded-lg text-xs sm:text-lg sm:w-[200px] hover:bg-white hover:scale-110 duration-500"
                    onClick={() => { setIndex((index + 1) % names.length); setIsClicked(!isClicked) }}
                >
                    {isClicked ? "Check out my moves" : "Impress Me!"}
                </button>
            </Html>
        </group>
    );
};


const AvatarCanvas = () => {
    return (
        <Canvas dpr={[0, 2]} className='h-screen'>
            <ambientLight intensity={3} />
            <pointLight position={[1, 1, 1]} />
            <OrbitControls enableZoom={false} enablePan={false} enabled={false} />
            <Suspense fallback={<Html><Loader /></Html>}>
                <Avatar />
            </Suspense>
            <Environment preset='sunset' />
        </Canvas>
    );
};

export default AvatarCanvas;