import React, {useEffect, useState} from 'react';
import {Unity, useUnityContext} from 'react-unity-webgl';
import { useParams, useNavigate } from 'react-router-dom';
import './Game.css';

function CardGame() {
    const unityContext = useUnityContext({
        loaderUrl: `${process.env.PUBLIC_URL}/unity_builds/CardGameBuild/Build/CardGameBuild.loader.js`,
        dataUrl: `${process.env.PUBLIC_URL}/unity_builds/CardGameBuild/Build/CardGameBuild.data`,
        frameworkUrl: `${process.env.PUBLIC_URL}/unity_builds/CardGameBuild/Build/CardGameBuild.framework.js`,
        codeUrl: `${process.env.PUBLIC_URL}/unity_builds/CardGameBuild/Build/CardGameBuild.wasm`,
    });

    return (
        <div className="game-container">
            <Unity unityProvider={unityContext.unityProvider} style={{ width: '70%', height: '70%' }} />
        </div>
    )
}

export default CardGame;
