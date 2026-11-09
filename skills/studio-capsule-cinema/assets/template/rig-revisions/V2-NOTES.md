# Drawer arm refinement

Problem: the approved drawer-contact pose returned through the generic IK solver to an offset wrist target. That solver put the elbow inside the torso, leaving the forearm awkwardly across the waist.

Correction: preserve the approved contact solve, then switch continuously to authored shoulder/forearm rotations. The shoulder leads and the hand follows a downward arc that stays outside the cabinet. The hand ends alongside the thigh with a neutral wrist. Finger creases fade as the palm relaxes; the mitten contour matches the existing resting hand.

This uses deliberate projected 2D proportions between the reaching and frontal rest drawings. It is not a new full 3D skeletal rig. Scene timing, drawer motion, captions, music and all five other shots remain unchanged.

Checks: 601 release samples, 101 contact samples; no elbow crossing, no wrist-center penetration past the original drawer contact, continuous release, zero contact drift. One representative frame from each of the five unchanged scenes is pixel-identical to the previous project snapshot. Contact/transition/rest frames are also inspected visually.
