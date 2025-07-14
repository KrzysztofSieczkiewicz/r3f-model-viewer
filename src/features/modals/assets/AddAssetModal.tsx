import React, { ReactNode, useState } from "react";
import styles from './AddAssetModal.module.css';

import { AssetModalPrimitivesList } from "./AssetModalPrimitivesList";
import { ButtonLargeRectangle } from "../common/ButtonLargeRectangle";
import { ImportMeshModal } from "./ImportMeshModal";
import { ButtonBackRound } from "../common/ButtonBackRound";
import { useTransition, animated, easings, useSpring } from "react-spring";
import { ElementSize, useElementSize } from "../../../hooks/useElementSize";

import { ReactComponent as SphereIcon } from '../../../icons/sidebar/primitives/primitive_sphere.svg'
import { ReactComponent as CubeIcon } from '../../../icons/sidebar/cube.svg';


type PageContainerProps = {
    children: ReactNode,
    showBackButton?: boolean,
    onBackClick?: () => void,
    pageRef: React.RefObject<HTMLDivElement>;
}

const PageContainer = ({children, showBackButton, onBackClick, pageRef}: PageContainerProps) => {
    return <div ref={pageRef} className={styles.contentsContainer}>
        {showBackButton && onBackClick &&
        <div className={styles.buttonTopBar}>
            <ButtonBackRound onClick={onBackClick}/>
        </div>}
        {children}
    </div>
}


type PageState = 'main' | 'primitives' | 'import';

type AssetModalProps = {
    closeModal: () => void
}

export const AddAssetModal = ({closeModal}: AssetModalProps) => {

    const [activePage, setActivePage] = useState<PageState>('main');
    const [prevPageSize, setPrevPageSize] = useState<ElementSize>({width: 0, height: 0});

    const [mainPageRef, mainPageSize] = useElementSize<HTMLDivElement>();
    const [primitivesPageRef, primitivesPageSize] = useElementSize<HTMLDivElement>();
    const [importPageRef, importPageSize] = useElementSize<HTMLDivElement>();

    const activePageSize = 
        activePage === 'main' ? mainPageSize :
        activePage === 'primitives' ? primitivesPageSize :
        importPageSize;
    
    const saveLastPageSize = () => {
        setPrevPageSize(activePageSize);
    }

    const switchToPage = (newPage: PageState) => {
        saveLastPageSize();
        setActivePage(newPage);
    }


    const modalSpring = useSpring({
        from: prevPageSize.width > 0 ? prevPageSize : activePageSize,
        to: activePageSize.width > 0 ? activePageSize : prevPageSize,
        config: { duration: 200, easing: easings.easeInOutCubic },
    });
    
    const contentTransition = useTransition(activePage, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        config: { duration: 200, easing: easings.easeInOutCubic },
        exitBeforeEnter: false
    });


    const renderMainPageContent = () => {
        return (<>
            <section className={styles.pageSection}>
                <h3 className={styles.sectionTitle}>
                    Browse models
                </h3>

                <div className={styles.buttonsContainer}>
                    <ButtonLargeRectangle
                        onClick={ () => {switchToPage('primitives')} }
                        displayName="Primitives"
                        icon={<SphereIcon/>}
                    />
                    <ButtonLargeRectangle
                        onClick={ () => {switchToPage('import')} }
                        displayName="Models"
                        icon={<CubeIcon/>}
                    />
                    <ButtonLargeRectangle
                        onClick={ () => {} }
                        displayName="Upload"
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


    return (<>
        <animated.div
            style={modalSpring}
            className={styles.modalContents}
        >
            {contentTransition((style, item) => (
                <animated.div style={{ ...style, position: 'absolute', width: '100%', height: '100%' }}>

                    {item === 'main' && (
                        <PageContainer pageRef={mainPageRef}>
                            {renderMainPageContent()}
                        </PageContainer>
                    )}
                    {item === 'primitives' && (
                        <PageContainer pageRef={primitivesPageRef} showBackButton onBackClick={() => switchToPage('main')}>
                            <AssetModalPrimitivesList closeModal={closeModal} />
                        </PageContainer>
                    )}
                    {item === 'import' && (
                        <PageContainer pageRef={importPageRef} showBackButton onBackClick={() => switchToPage('main')}>
                            <ImportMeshModal src={""} closeModal={() => {}}/>
                        </PageContainer>
                    )}

                </animated.div>
            ))}
        </animated.div>
    </>);

}