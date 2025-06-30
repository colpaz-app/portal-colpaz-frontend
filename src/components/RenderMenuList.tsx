import { useState } from 'react';
import type { MenuItem } from '../types/MenuItem';
import { RenderMenuItem } from './RenderMenuItem';

const RenderMenuList = ({ items, t }: { items: MenuItem[]; t: (key: string) => string }) => {
    const [activePaths, setActivePaths] = useState<Record<number, string | null>>({});

    return (
        <ul>
            {items.map((item, i) => (
                <RenderMenuItem
                    key={i}
                    item={item}
                    t={t}
                    activePaths={activePaths}
                    setActivePaths={setActivePaths}
                />
            ))}
        </ul>
    );
};

export default RenderMenuList;