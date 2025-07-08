import React, { ReactNode, useState } from "react";
import styles from './AddAssetModal.module.css';

import { ReactComponent as SphereIcon } from '../../../icons/sidebar/primitives/primitive_sphere.svg'
import { ReactComponent as CubeIcon } from '../../../icons/sidebar/cube.svg';

import { AssetModalPrimitivesList } from "./AssetModalPrimitivesList";
import { ButtonLargeRectangle } from "../common/ButtonLargeRectangle";
import { ImportMeshModal } from "./ImportMeshModal";
import { ButtonBackRound } from "../common/ButtonBackRound";
import { useTransition, animated, easings } from "react-spring";

type Props = {
    closeModal: () => void
}

export const AddAssetModal = ({closeModal}: Props) => {

    const [currentContent, setCurrentContent] = useState<ReactNode|null>(null);


    // TODO: finish with proper conditions -> experiment with that
    const transition = useTransition(true, {
        from: { opacity: 0, maxWidth: '30vw' },
        enter: { opacity: 1, maxWidth: '60vw' },
        leave: { opacity: 0, maxWidth: '0vw' },
        config: { duration: 250, easing: easings.easeInOutQuad },
    });


    const switchToPrimitivesList = () => {
        setCurrentContent( renderPrimitivesList() );
    }

    const switchToImportDetails = () => {
        setCurrentContent( renderImportDetails() )
    }

    const switchToMainPage = () => {
        setCurrentContent( null )
    }


    const renderPrimitivesList = () => {
        return (<>
            <div className={styles.topBar}>
                <ButtonBackRound onClick={switchToMainPage}/>
            </div>
            <AssetModalPrimitivesList closeModal={closeModal} />
        </>)
    }

    const renderImportDetails = () => {
        return (<>
            <div className={styles.topBar}>
                <ButtonBackRound onClick={switchToMainPage}/>
            </div>
            <ImportMeshModal src={""} closeModal={() => {}}/>
        </>)
    }

    const renderMainPage = () => {
        return (<>
            <section className={styles.pageSection}>
                <h3 className={styles.sectionTitle}>
                    Browse models
                </h3>

                <div className={styles.buttonsContainer}>
                    <ButtonLargeRectangle
                        onClick={ () => {switchToPrimitivesList()} }
                        displayName="Primitives"
                        icon={<SphereIcon/>}
                    />
                    <ButtonLargeRectangle
                        onClick={ () => {switchToImportDetails()} }
                        displayName="Models"
                        icon={<CubeIcon/>}
                    />
                </div>
            </section>
            <section className={styles.pageSection}>
                <h3 className={styles.sectionTitle}>
                    Import models
                </h3>
                <p> Something will be here later </p>
            </section>
        </>);
    }


    return (
        transition( (style, item) => 
            item 
                ? <animated.div 
                    style={style}
                    className={styles.modalContents} >
                    
                    {currentContent || renderMainPage()}

                </animated.div>
                : null
        )
    );

}