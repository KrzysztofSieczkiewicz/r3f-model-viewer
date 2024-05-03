import React from "react";
import styles from './../Sidebar.module.css'

import { ColorPicker } from "../common/ColorPicker";
import { Slider } from "../common/Slider";
import { useScene } from "../../contexts/SceneContext";

export const SceneMenu = () => {
    const [ scene, setScene ] = useScene();
    
    return (
        <div className={styles.menu}>
            <section className={styles.menuSection}>
                <h3 className={styles.sectionHeader}>Background</h3>
                <ColorPicker name="Color" 
                    currentColor={scene.backgroundColor}
                    handleChange={(val) => setScene({...scene, backgroundColor: val}) }
                />
            </section>
            <section className={styles.menuSection}>
                <h3 className={styles.sectionHeader}>Ambient light</h3>
                <ColorPicker name="Color"
                    currentColor={scene.ambientColor}
                    handleChange={(val) =>  setScene({...scene, ambientColor: val}) }
                />
                <Slider name="Intensity"
                    value={scene.ambientIntensity}
                    handleChange={(val) =>  setScene({...scene, ambientIntensity: val}) }
                    min={0} max={3} step={0.001} defaultValue={0.1}
                />
            </section>
        </div>
    );
}