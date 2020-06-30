-------------------------------------------------------
-- IMPORTS
-------------------------------------------------------

import XMonad
import XMonad.Config.Desktop
import Data.Monoid
import System.Exit
import Graphics.X11.ExtraTypes.XF86
import qualified XMonad.StackSet as W
import qualified Data.Map        as M

-- Util
import XMonad.Util.SpawnOnce
import XMonad.Util.Run
import XMonad.Util.EZConfig

-- Hooks
import XMonad.Hooks.ManageDocks
import XMonad.Hooks.DynamicLog
import XMonad.Hooks.EwmhDesktops -- to show workspaces in application switchers
import XMonad.Hooks.ManageHelpers (isFullscreen, isDialog,  doFullFloat, doCenterFloat, doRectFloat) 
import XMonad.Hooks.Place (placeHook, withGaps, smart)
import XMonad.Hooks.UrgencyHook
import XMonad.Hooks.WorkspaceHistory

-- Layout
import XMonad.Layout.Spacing
import XMonad.Layout.NoBorders
import XMonad.Layout.Named

-------------------------------------------------------
-- CONFIG
-------------------------------------------------------

myModMask = mod4Mask
myTerminal = "terminator"
myBorderWidth = 1
myNormalBorderColor = "#004c99" 
myFocusedBorderColor = "#dddddd" 
myFocusFollowsMouse = True
myClickJustFocuses = False
--myWorkspaces = ["1","2","3","4","5","6","7","8","9"]
xmobarEscape = concatMap doubleLts
  where doubleLts '<' = "<<"
        doubleLts x   = [x]
myWorkspaces :: [String]
myWorkspaces = clickable . (map xmobarEscape) $ ["1","2","3","4","5","6","7","8","9"]
  where
         clickable l = [ "<action=xdotool key super+" ++ show (n) ++ ">" ++ ws ++ "</action>" |
                             (i,ws) <- zip [1..9] l,
                            let n = i ]
-------------------------------------------------------
-- STARTUP HOOK
-------------------------------------------------------

myStartupHook = do
        spawnOnce "xfce4-power-manager &"
        spawnOnce "nitrogen --restore &"
        spawnOnce "compton &"
        spawnOnce "xinput set-prop 'SynPS/2 Synaptics TouchPad' 'libinput Tapping Enabled' 1"

-------------------------------------------------------
-- LAYOUT
-------------------------------------------------------

myLayout = avoidStruts( tiled ) ||| Full -- Add ' ||| Mirror tilled ' if you want
  where
     tiled   = smartSpacing 5 $ Tall nmaster delta ratio -- default tiling algorithm partitions the screen into two panes 
     nmaster = 1 -- The default number of windows in the master pane 
     ratio   = 1/2 -- Default proportion of screen occupied by master pane
     delta   = 3/100 -- Percent of screen to increment by when resizing panes
 
-------------------------------------------------------
-- WINDOW RULES
-------------------------------------------------------

myManageHook = composeAll
    [ 
      className =? "Firefox"            --> doShift (myWorkspaces !! 0)   -- It will shift to 'num' + 1 like 0+1 = 1 so on 1 workspace.
    , className =? "Transmission-gtk"   --> doShift (myWorkspaces !! 5)
    , className =? "MPlayer"            --> doFloat
    , className =? "Gimp"               --> doFloat
    , resource  =? "desktop_window"     --> doIgnore
    , resource  =? "kdesktop"           --> doIgnore ]


-------------------------------------------------------
-- EVENT HANDELING
-------------------------------------------------------

myEventHook = mempty

-------------------------------------------------------
-- STATUS BAR AND LOGGING
-------------------------------------------------------

--myLogHook = workspaceHistoryHook <+> dynamicLogWithPP xmobarPP
--              { ppOutput = \x -> hPutStrLn xmproc x
--              , ppCurrent = xmobarColor "#c3e88d" "" . wrap "[" "]" -- Current workspace in xmobar
--              , ppVisible = xmobarColor "#c3e88d" ""                -- Visible but not current workspace
--              , ppHidden = xmobarColor "#82AAFF" "" . wrap "*" ""   -- Hidden workspaces in xmobar
--                         -- , ppHiddenNoWindows = xmobarColor "#F07178" ""        -- Hidden workspaces (no windows)
--              , ppHiddenNoWindows= \( _ ) -> ""       -- Only shows visible workspaces. Useful for TreeSelect.
--              , ppTitle = xmobarColor "#d0d0d0" "" . shorten 60     -- Title of active window in xmobar
--              , ppSep =  "<fc=#666666> | </fc>"                     -- Separators in xmobar
--              , ppUrgent = xmobarColor "#C45500" "" . wrap "!" "!"  -- Urgent workspace
--             -- , ppExtras  = [windowCount]                           -- # of windows current workspace
--              , ppOrder  = \(ws:l:t:ex) -> [ws,l]++ex++[t]
--              }
-------------------------------------------------------
-- KEY BINDINGS
-------------------------------------------------------

myKeys conf@(XConfig {XMonad.modMask = modm}) = M.fromList $

    [
    --Exchange the active and non active window
    ((modm .|. shiftMask, xK_space ), setLayout $ XMonad.layoutHook conf)
    ]
    ++
    [((m .|. modm, k), windows $ f i)
        | (i, k) <- zip (XMonad.workspaces conf) [xK_1 .. xK_9]
        , (f, m) <- [(W.greedyView, 0), (W.shift, shiftMask)]]


-- Mouse bindings: default actions bound to mouse events

myMouseBindings (XConfig {XMonad.modMask = modm}) = M.fromList $

    -- mod-button1, Set the window to floating mode and move by dragging
    [ ((modm, button1), (\w -> focus w >> mouseMoveWindow w
                                       >> windows W.shiftMaster))

    -- mod-button2, Raise the window to the top of the stack
    , ((modm, button2), (\w -> focus w >> windows W.shiftMaster))

    -- mod-button3, Set the window to floating mode and resize by dragging
    , ((modm, button3), (\w -> focus w >> mouseResizeWindow w
                                       >> windows W.shiftMaster))

    -- you may also bind events to the mouse scroll wheel (button4 and button5)
    ]

mykeys =

    -- launch a terminal
    [ ("M-<Return>", spawn "terminator")

    -- launch dmenu
    , ("M-x", spawn "dmenu_run -i -fn 'Monospace' -nf '#F4800d' -sb '#f4800d' -sf '#1e1e1e'")

    -- launch firefox
    , ("M-b", spawn "firefox")

    -- mute volume
    , ("<XF86AudioMute>", spawn "amixer -q -D pulse set Master 1+ toggle")

    -- decrease volume
    , ("<XF86AudioLowerVolume>", spawn "amixer -q set Master 5%-")

    -- mute volume
    , ("<XF86AudioLowerVolume>", spawn "amixer -q set Master 5%+")

    -- increse brightness
    , ("<XF86MonBrightnessUp>", spawn "/home/yash/.xmonad/brightness.sh +2")

    -- decrese brightness
    , ("<XF86MonBrightnessDown>", spawn "/home/yash/.xmonad/brightness.sh -2")
    
    -- close focused window
    , ("M-q", kill)

     -- Rotate through the available layout algorithms
    , ("M-<Space>", sendMessage NextLayout)

    -- Resize viewed windows to the correct size
    , ("M-n", refresh)

    -- Move focus to the next window
    , ("M-<Tab>", windows W.focusDown)

    -- Move focus to the next window
    , ("M-j", windows W.focusDown)

    -- Move focus to the previous window
    , ("M-k", windows W.focusUp  )

    -- Move focus to the master window
    , ("M-m", windows W.focusMaster  )

    -- Swap the focused window and the master window
    , ("M-S-<Return>", windows W.swapMaster)

    -- Swap the focused window with the next window
    , ("M-S-j", windows W.swapDown  )

    -- Swap the focused window with the previous window
    , ("M-S-k", windows W.swapUp    )

    -- Shrink the master area
    , ("M-h", sendMessage Shrink)

    -- Expand the master area
    , ("M-l", sendMessage Expand)

    -- Push window back into tiling
    , ("M-t", withFocused $ windows . W.sink)

    -- Increment the number of windows in the master area
    , ("M-,", sendMessage (IncMasterN 1))

    -- Deincrement the number of windows in the master area
    , ("M-.", sendMessage (IncMasterN (-1)))

    -- Toggle the status bar gap
    -- Use this binding with avoidStruts from Hooks.ManageDocks.
    -- See also the statusBar function from Hooks.DynamicLog.
    --
    -- , ((modm              , xK_b     ), sendMessage ToggleStruts)

    -- Quit xmonad
    , ("M-S-q", io (exitWith ExitSuccess))

    -- Lock screen
    , ("M-S-l", spawn "i3lock-fancy")

    -- Restart xmonad
    , ("M-r", spawn "xmonad --recompile; xmonad --restart")

    -- Run xmessage with a summary of the default keybindings (useful for beginners)
    , ("M-S-/", spawn ("echo \"" ++ help ++ "\" | xmessage -file -"))
    ]
-------------------------------------------------------
-- MAIN
-------------------------------------------------------

main = do
  xmproc <- spawnPipe "xmobar /home/yash/.config/xmobar/xmobarrc"
  xmonad $ docks def {
      -- simple stuff
        terminal           = myTerminal,
        focusFollowsMouse  = myFocusFollowsMouse,
        clickJustFocuses   = myClickJustFocuses,
        borderWidth        = myBorderWidth,
        modMask            = myModMask,
        workspaces         = myWorkspaces,
        normalBorderColor  = myNormalBorderColor,
        focusedBorderColor = myFocusedBorderColor,

      -- key bindings
        keys               = myKeys,
        mouseBindings      = myMouseBindings,

      -- hooks, layouts
        layoutHook         = myLayout,
        manageHook         = myManageHook,
        handleEventHook    = myEventHook,
        startupHook        = myStartupHook,
      --  logHook            = myLogHook,
        logHook            = workspaceHistoryHook <+> dynamicLogWithPP xmobarPP
                                 { ppOutput = hPutStrLn xmproc 
                                 , ppCurrent = xmobarColor "#c3e88d" "" . wrap "[" "]" -- Current workspace in xmobar
                                 , ppVisible = xmobarColor "#c3e88d" ""                -- Visible but not current workspace
                                 , ppHidden = xmobarColor "#82AAFF" "" . wrap "*" ""   -- Hidden workspaces in xmobar
                                 --, ppHiddenNoWindows = xmobarColor "#F07178" ""        -- Hidden workspaces (no windows)
                                 , ppHiddenNoWindows= \( _ ) -> ""       -- Only shows visible workspaces. Useful for TreeSelect.
                                 , ppTitle = xmobarColor "#d0d0d0" "" . shorten 60     -- Title of active window in xmobar
                                 , ppSep =  "<fc=#666666> | </fc>"                     -- Separators in xmobar
                                 , ppUrgent = xmobarColor "#C45500" "" . wrap "!" "!"  -- Urgent workspace
                                 --, ppExtras  = [windowCount]                           -- # of windows current workspace
                                 , ppOrder  = \(ws:l:t:ex) -> [ws,l]++ex++[t]
                                 }

    }`additionalKeysP` mykeys 

-------------------------------------------------------
-- HELP MENU
-------------------------------------------------------

help :: String
help = unlines ["The default modifier key is 'Super'. Default keybindings:",
    "",
    "-- launching and killing programs",
    "mod-Enter        Launch terminator",
    "mod-x            Launch dmenu",
    "mod-b            Launch firefox",
    "mod-q            Close/kill the focused window",
    "mod-Space        Rotate through the available layout algorithms",
    "mod-Shift-Space  Reset the layouts on the current workSpace to default",
    "mod-n            Resize/refresh viewed windows to the correct size",
    "",
    "-- move focus up or down the window stack",
    "mod-Tab        Move focus to the next window",
    "mod-Shift-Tab  Move focus to the previous window",
    "mod-j          Move focus to the next window",
    "mod-k          Move focus to the previous window",
    "mod-m          Move focus to the master window",
    "",
    "-- modifying the window order",
    "mod-Shift-Enter   Swap the focused window and the master window",
    "mod-Shift-j  Swap the focused window with the next window",
    "mod-Shift-k  Swap the focused window with the previous window",
    "",
    "-- resizing the master/slave ratio",
    "mod-h  Shrink the master area",
    "mod-l  Expand the master area",
    "",
    "-- floating layer support",
    "mod-t  Push window back into tiling; unfloat and re-tile it",
    "",
    "-- increase or decrease number of windows in the master area",
    "mod-comma  (mod-,)   Increment the number of windows in the master area",
    "mod-period (mod-.)   Deincrement the number of windows in the master area",
    "",
    "-- quit, or restart",
    "mod-Shift-q  Quit xmonad",
    "mod-r        Restart xmonad",
    "mod-[1..9]   Switch to workSpace N",
    "",
    "-- Workspaces & screens",
    "mod-Shift-[1..9]   Move client to workspace N",
    "mod-{w,e,r}        Switch to physical/Xinerama screens 1, 2, or 3",
    "mod-Shift-{w,e,r}  Move client to screen 1, 2, or 3",
    "",
    "-- Mouse bindings: default actions bound to mouse events",
    "mod-button1  Set the window to floating mode and move by dragging",
    "mod-button2  Raise the window to the top of the stack",
    "mod-button3  Set the window to floating mode and resize by dragging"]

