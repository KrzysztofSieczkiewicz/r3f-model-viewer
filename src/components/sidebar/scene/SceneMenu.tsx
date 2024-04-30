import React from "react";
import styles from './../Sidebar.module.css'

import { useSidebarControlsContext } from '../../contexts/SidebarControlsContext'
import { ColorPicker } from "../common/ColorPicker";
import { Slider } from "../common/Slider";

export const SceneMenu = () => {
    const { scene, updateScene } = useSidebarControlsContext();
    
    return (
        <div className={styles.menu}>
            <section className={styles.menuSection}>
                <h3 className={styles.sectionHeader}>Background</h3>
                <ColorPicker name="Color" 
                    currentColor={scene.backgroundColor}
                    handleChange={(val) => updateScene('backgroundColor', val)}
                />
            </section>
            <section className={styles.menuSection}>
                <h3 className={styles.sectionHeader}>Ambient light</h3>
                <ColorPicker name="Color"
                    currentColor={scene.ambientLight.color}
                    handleChange={(val) => updateScene('ambientLight.color', val)}
                />
                <Slider name="Intensity"
                    value={scene.ambientLight.intensity}
                    handleChange={(val) => updateScene('ambientLight.intensity', val)}
                    min={0} max={3} step={0.001} defaultValue={0.1}
                />
            </section>
        </div>
    );
}