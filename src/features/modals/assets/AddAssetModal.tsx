import React, { useState } from "react";
import styles from './AddAssetModal.module.css';

import { ReactComponent as SphereIcon } from '../../../icons/sidebar/primitives/primitive_sphere.svg'
import { ReactComponent as CubeIcon } from '../../../icons/sidebar/cube.svg';

import { AssetModalPrimitivesList } from "./AssetModalPrimitivesList";
import { ButtonLargeRectangle } from "../common/ButtonLargeRectangle";
import { ImportMeshModal } from "./ImportMeshModal";
import { ButtonBackRound } from "../common/ButtonBackRound";
import { useTransition, animated, easings, useSpring } from "react-spring";
import { ElementSize, useElementSize } from "../../../hooks/useElementSize";

type Props = {
    closeModal: () => void
}

type PageState = 'main' | 'primitives' | 'import';

export const AddAssetModal = ({closeModal}: Props) => {

    const [activePage, setActivePage] = useState<PageState>('main');
    const [prevPageSize, setPrevPageSize] = useState<ElementSize>({width: 0, height: 0});

    const [mainPageContentRef, mainPageSize] = useElementSize<HTMLDivElement>();
    const [primitivesContentRef, primitivesPageSize] = useElementSize<HTMLDivElement>();
    const [importDetailsContentRef, importDetailsPageSize] = useElementSize<HTMLDivElement>();

    const activePageSize = 
        activePage === 'main' ? mainPageSize :
        activePage === 'primitives' ? primitivesPageSize :
        importDetailsPageSize;
    
    const savePreviousPageSize = () => {
        setPrevPageSize(activePageSize);
    }

    console.log("from: ", prevPageSize.width > 0 ? prevPageSize : activePageSize)
    console.log("to: ", activePageSize.width > 0 ? activePageSize : prevPageSize)
    const modalSpring = useSpring({
        from: prevPageSize.width > 0 ? prevPageSize : activePageSize,
        to: activePageSize.width > 0 ? activePageSize : prevPageSize,
        config: { duration: 100, easing: easings.easeInOutCubic },
    });
    
    // TODO: override this manually - first mount an invisible page, then useSpring it into existence. 
    // It'll give You more time to get 'page size' to useSpring container size to.
    const contentTransition = useTransition(activePage, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        config: { duration: 200, easing: easings.easeInOutCubic },
        exitBeforeEnter: false,
    });


    const switchToPrimitivesList = () => {
        savePreviousPageSize()
        setActivePage('primitives');
    }

    const switchToImportDetails = () => {
        savePreviousPageSize()
        setActivePage('import');
    }

    const switchToMainPage = () => {
        savePreviousPageSize()
        setActivePage('main');
    }

    const renderPrimitivesList = () => {
        return (
            <div ref={primitivesContentRef} className={styles.contentsContainer}>
                <div className={styles.topBar}>
                    <ButtonBackRound onClick={switchToMainPage}/>
                </div>
                <AssetModalPrimitivesList closeModal={closeModal} />
            </div>
        )
    }

    const renderImportDetails = () => {
        return (
            <div ref={importDetailsContentRef} className={styles.contentsContainer}>
                <div className={styles.topBar}>
                    <ButtonBackRound onClick={switchToMainPage}/>
                </div>
                <ImportMeshModal src={""} closeModal={() => {}}/>
            </div>)
    }

    const renderMainPage = () => {
        return (<div ref={mainPageContentRef} className={styles.contentsContainer}>
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
        </div>);
    }


    return (<>
        <animated.div
            style={modalSpring}
            className={styles.modalContents}
        >
            {contentTransition((style, item) => (
                <animated.div style={{ ...style, position: 'absolute', width: '100%', height: '100%' }}>
                    {item === 'main' && renderMainPage()}
                    {item === 'primitives' && renderPrimitivesList()}
                    {item === 'import' && renderImportDetails()}
                </animated.div>
            ))}
        </animated.div>
    </>);

}