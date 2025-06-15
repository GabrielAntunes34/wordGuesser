import { useGame } from '../contexts/gameContext';

// Used in a list to represent our saved wordtags and permit
// it's deletion
const TagItem = ({index, tag}) => {
    const { wordTags, removeWordTag } = useGame();

    const handleRemove = (word) => {
        removeWordTag(word);
    }

    return (
        <>
            <li key={index}>{tag.word}: {tag.translations[0]}</li>
            <button onClick={() => handleRemove(tag.word)}>DEL</button>
        </>
    )
};

export default TagItem;