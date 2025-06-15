import { createContext, useContext, useEffect, useState } from "react";
import { parseStrToWordTag, parseListToWordTag } from '../utils/wordTag';
import Papa from "papaparse";

const gameContext = createContext();

// Customized component to encapsulate the game's words provider
// and it's handlers

const GameProvider = ({ children }) => {
    const [languages, setLanguages] = useState(null);
    const [csvFile, setCsvFile] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    
    // Instanciating wordTags as our main list of words
    // to play with, and verifying if we already have one
    // of them
    const [wordTags, setWordTags] = useState(() => {
        const saved = localStorage.getItem('wordTags');
        return saved ? JSON.parse(saved) : [];
    });
    
    // Saves wordData at localStorage when it changes
    useEffect(() => {
        if (wordTags)
            localStorage.setItem('wordTags', JSON.stringify(wordTags));
    }, [wordTags]);


    // Adds a brand new wrod tag into our wordTag state list
    const addWordTag = (string) => {
        const wordTag = parseStrToWordTag(string);
        
        // Verifying if there isn't any tag with this selection already
        const alreadyExists = wordTags.some(wt => wt.word === wordTag.word);
        if (alreadyExists) return;

        setWordTags(prevWordTags => [...prevWordTags, wordTag]);
    };

    // Removes an wordTag from our state list in React
    const removeWordTag = (word) => {
        // searching and removing the specified element
        for(let i = 0; i < wordTags.length; i++) {
            if(wordTags[i].word === word) {
                setWordTags(prevWordTags => {
                    const updated = [...prevWordTags];
                    updated.splice(i, 1);
                    return updated;
                });
                return true;
            }
        }

        return false;
    };

    // Sets our wordTags state with a new list coming from an user's csv
    const loadCSV = (file) => {
        try{
            Papa.parse(file, {
                header: false,
                skipEmptyLines: true,
                complete: function (results) {
                    const data = results.data;
    
                    console.log(data[0]);

                    // Reseting our current list of tags
                    setWordTags([]);

                    // Setting the languages choosed for the game
                    setLanguages({
                        mainLang: data[0][0],
                        translationLang: data[0][1].trim()
                    })


                    // Converting file data to a list of word tags!
                    const newWordList = [];

                    console.log(data.length);

                    for(let i = 1; i < data.length; i++) {
                        const wordTag = parseListToWordTag(data[i]);
                        newWordList.push(wordTag);
                    }
                    console.log(newWordList);
                    setWordTags(newWordList);
                },
            });
            return true
        }catch(e){
            return false
        }

    };


    return (
        <>
            <gameContext.Provider value={{
                languages,
                wordTags,
                csvFile,
                setCsvFile,
                addWordTag,
                removeWordTag,
                loadCSV
            }}>
                {children}
            </gameContext.Provider>
        </>
    );
};

const useGame = () => useContext(gameContext);

export { GameProvider, useGame };