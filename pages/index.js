import Head from 'next/head';
import { useCallback, useContext, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { SettingsContext } from 'utils/settings';
import Set from 'components/Set';
import Intermission from 'components/Intermission';

export default function Trainer() {
  const [isSolving, setIsSolving] = useState(false);
  const [problems, setProblems] = useState(null);
  const { data: session } = useSession();
  const { settings } = useContext(SettingsContext);
  const { operation, operandLengths, setProblemCount } = settings;

  // Abort if the user signs out during a set.
  useEffect(() => {
    if (!session) {
      setIsSolving(false);
    }
  }, [session]);

  // Abort if the set settings change (in another tab).
  useEffect(() => {
    setIsSolving(false);
  }, [operation, operandLengths, setProblemCount]);

  const handleAbort = () => {
    setIsSolving(false);
  };

  const handleSetEnd = useCallback(async (problems) => {
    setProblems(problems);
    setIsSolving(false);
  }, []);

  const handleNewSet = () => {
    setProblems(null);
    setIsSolving(true);
  };

  return (
    <>
      <Head>
        <title>Mental Math Trainer</title>
      </Head>
      {isSolving ? (
        <Set onAbort={handleAbort} onSetEnd={handleSetEnd} />
      ) : (
        <Intermission problems={problems} onNewSet={handleNewSet} />
      )}
    </>
  );
}
